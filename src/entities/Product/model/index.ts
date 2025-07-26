import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import type { CoffeeApiRequest, OrderCoffeeRequest, OrderItem } from '../api';
import type { CoffeeCartActions, CoffeeCartState, CoffeeListActions, CoffeeListState } from '../types';
import { cartSlice } from './cartSlice.ts';
import { listSlice } from './listSlice.ts';

export const useCoffeeStore = create<CoffeeListState & CoffeeListActions & CoffeeCartActions & CoffeeCartState>()(
    devtools(persist((...arg) => ({ ...listSlice(...arg), ...cartSlice(...arg) }), { name: 'coffeeStore' }))
);

export const getCoffeeList = (params?: CoffeeApiRequest) => useCoffeeStore.getState().getCoffeeList(params);
export const setParams = (params?: CoffeeApiRequest) => useCoffeeStore.getState().setParams(params);
export const orderCoffee = (body: OrderCoffeeRequest) => useCoffeeStore.getState().orderCoffee(body);
export const setCoffeeCart = (item: OrderItem) => useCoffeeStore.getState().setCoffeeCart(item);
