import { store } from '@davstack/store';

import type { Cart } from '../types';

interface CartModelState {
    cart: Cart[];
    cartProductsCount: number;
    cartTotalFullPrice: number;
    cartTotalFullDiscount: number;
    cartTotalFinalPrice: number;
}

export const useCartModel = store<CartModelState>().state({
    cart: [],
    cartProductsCount: 0,
    cartTotalFullPrice: 0,
    cartTotalFullDiscount: 0,
    cartTotalFinalPrice: 0,
});
