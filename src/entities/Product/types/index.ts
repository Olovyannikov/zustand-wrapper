import type { CoffeeApiRequest, CoffeeApiResponse, OrderCoffeeRequest, OrderItem } from '../api';

export interface CoffeeListState {
    coffeeList: CoffeeApiResponse[] | null;
    abortController?: AbortController | null;
    params?: CoffeeApiRequest;
}

export interface CoffeeListActions {
    getCoffeeList(params?: CoffeeApiRequest): void;
    setParams: (params?: CoffeeApiRequest) => void;
}

export interface CoffeeCartState {
    cart: OrderItem[];
    address?: string;
}

export interface CoffeeCartActions {
    setAddress(address: string): void;
    orderCoffee(body: OrderCoffeeRequest): void;
    setCoffeeCart(item: OrderItem): void;
    clearCart(): void;
}

export const CoffeeType = {
    cappuccino: 'cappuccino',
    latte: 'latte',
    macchiato: 'macchiato',
    americano: 'americano',
};

export interface CoffeeQueryParams {
    text?: string;
    type?: keyof typeof CoffeeType | null;
}
