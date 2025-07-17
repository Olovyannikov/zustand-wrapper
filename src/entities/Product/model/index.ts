import { showNotification } from '@mantine/notifications';
import { ofetch } from 'ofetch';
import { create, type StateCreator } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import type { CoffeeApiRequest, CoffeeApiResponse, OrderCoffeeRequest, OrderCoffeeResponse, OrderItem } from '../api';

const BASE_URL = 'https://purpleschool.ru/coffee-api';
const ORDER_URL = BASE_URL + '/order';

interface CoffeeState {
    list: CoffeeApiResponse[] | null;
    searchInput: string;
    abortController?: AbortController | null;
    cart: OrderItem[];
}

interface CoffeeActions {
    getCoffeeList(params?: CoffeeApiRequest): void;
    orderCoffee(body: OrderCoffeeRequest): void;
    changeSearchInput(value: string): void;
    setCoffeeCart(item: OrderItem): void;
}

const coffeeSlice: StateCreator<
    CoffeeState & CoffeeActions,
    [['zustand/devtools', never], ['zustand/persist', unknown]]
> = (set, get) => ({
    list: null,
    searchInput: '',
    abortController: null,
    cart: [],
    setCoffeeCart(item: OrderItem) {
        const { cart } = get();

        const element = cart.find((el) => el.id === item.id);

        if (element) {
            const quantity = element?.quantity && element.quantity > 0 ? element?.quantity : 1;
            element.quantity = quantity + 1;
            set({ cart: [...cart] });
        } else {
            set({ cart: [...cart, { ...item }] });
        }
    },
    async getCoffeeList(params) {
        const { abortController } = get();

        if (abortController) {
            abortController.abort?.();
        }

        const controller = new AbortController();
        const { signal } = controller;

        set({ abortController: controller });

        try {
            const data = await ofetch<CoffeeApiResponse[]>(BASE_URL, {
                params,
                signal,
            });

            set({ list: data });
        } catch (error) {
            console.error(error);
        }
    },
    changeSearchInput(value: string) {
        set({ searchInput: value });
    },
    async orderCoffee(body) {
        try {
            const res = await ofetch<OrderCoffeeResponse>(ORDER_URL, {
                body,
                method: 'POST',
            });

            if (res.success) {
                showNotification({
                    message: res.message,
                });
                set({ cart: [] });
            }
        } catch (error) {
            console.error(error);
        }
    },
});

export const useCoffeeStore = create<CoffeeActions & CoffeeState>()(
    devtools(persist(coffeeSlice, { name: 'coffeeStore' }))
);
