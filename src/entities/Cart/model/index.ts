import { store } from '@davstack/store';

import type { ProductModel } from '@/entities/Product';

import type { Cart } from '../types';

interface CartModelState {
    cart: Cart[];
    cartProductsCount: number;
    cartTotalFullPrice: number;
    cartTotalFullDiscount: number;
    cartTotalFinalPrice: number;
}

export const useCartModel = store<CartModelState>()
    .state({
        cart: [] as Cart[],
        cartProductsCount: 0,
        cartTotalFullPrice: 0,
        cartTotalFullDiscount: 0,
        cartTotalFinalPrice: 0,
    })
    .actions((store) => ({
        addProductToCart: (product: ProductModel) =>
            store.cart.set((prev) => {
                const existedProduct = prev.find((el) => el.product.id === product.id);
                if (existedProduct && existedProduct.count > 0) {
                    const preparedStore = [...prev];
                    const idx = preparedStore.findIndex((val) => val.product.id === existedProduct.product.id);
                    preparedStore[idx] = {
                        product: existedProduct.product,
                        count: existedProduct.count + 1,
                    };
                    return preparedStore;
                }

                return [...prev, { product, count: 1 }];
            }),
        removeProductFromCart: (product: ProductModel) =>
            store.cart.set((prev) => {
                const existedProduct = prev.find((el) => el.product.id === product.id);
                if (existedProduct && existedProduct.count > 1) {
                    const preparedStore = [...prev];
                    const idx = preparedStore.findIndex((val) => val.product.id === existedProduct.product.id);
                    preparedStore[idx] = {
                        product: existedProduct.product,
                        count: existedProduct.count - 1,
                    };
                    return preparedStore;
                }
                return prev.filter((el) => el.product.id !== product.id);
            }),
    }));
