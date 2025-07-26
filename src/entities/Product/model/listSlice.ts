import { ofetch } from 'ofetch';
import type { StateCreator } from 'zustand';

import { BASE_URL } from '@/shared/api';

import type { CoffeeApiResponse } from '@/entities/Product';

import type {
    CoffeeCartActions,
    CoffeeCartState,
    CoffeeListActions,
    CoffeeListState,
    CoffeeQueryParams,
} from '../types';

export const listSlice: StateCreator<
    CoffeeListActions & CoffeeListState & CoffeeCartActions & CoffeeCartState,
    [['zustand/devtools', never], ['zustand/persist', unknown]],
    [['zustand/devtools', never]],
    CoffeeListActions & CoffeeListState
> = (set, get) => ({
    coffeeList: null,
    controller: null,
    params: { text: '', type: null },
    setParams: (params) => {
        set({ params: { ...get().params, ...params } });
    },
    getCoffeeList: async (params?: CoffeeQueryParams) => {
        const { abortController } = get();

        if (abortController) abortController.abort?.();

        const newController = new AbortController();
        set({ abortController: newController });

        const { signal } = newController;
        const data = await ofetch<CoffeeApiResponse[]>(BASE_URL, {
            params,
            signal,
        });
        set({ coffeeList: data });
        return data;
    },
});
