import { showNotification } from '@mantine/notifications';
import { ofetch } from 'ofetch';
import type { StateCreator } from 'zustand';

import { API } from '@/shared/api';

import type { OrderCoffeeResponse, OrderItem } from '@/entities/Product';

import type { CoffeeCartActions, CoffeeCartState, CoffeeListActions, CoffeeListState } from '../types';

export const cartSlice: StateCreator<
    CoffeeCartActions & CoffeeCartState & CoffeeListActions & CoffeeListState,
    [['zustand/devtools', never], ['zustand/persist', unknown]],
    [['zustand/devtools', never], ['zustand/persist', unknown]],
    CoffeeCartActions & CoffeeCartState
> = (set, get) => ({
    cart: [],
    address: '',
    setAddress(address: string) {
        set({ address });
    },
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
    async orderCoffee(body) {
        try {
            const res = await ofetch<OrderCoffeeResponse>(API.ORDER_URL, {
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
    clearCart() {
        set({ cart: [] });
    },
});
