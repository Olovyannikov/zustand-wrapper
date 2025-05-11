import { useIntersectionObserver } from 'usehooks-ts';

import { useIsLarge } from '@/shared/lib/hooks';

import { useFiltersModel } from '@/entities/Filter';
import { useProductModel } from '@/entities/Product';
import { getProductsQuery } from '@/entities/Product/api';
import { useUserModel } from '@/entities/User';

import { PRODUCTS_SCROLL_THRESHOLD } from './const';

export const useProductsWidget = () => {
    const isLarge = useIsLarge();

    const { isAuthorized } = useUserModel.use();

    const { query, page } = useFiltersModel.use();
    const incrementPage = useFiltersModel.incrementPage;

    const { productsCount } = useProductModel.use();
    const { loading: isLoading, data } = getProductsQuery.getState();

    const { ref } = useIntersectionObserver({
        initialIsIntersecting: false,
        threshold: isLarge ? PRODUCTS_SCROLL_THRESHOLD.LARGE : PRODUCTS_SCROLL_THRESHOLD.SMALL,
        onChange: (isIntersecting) => {
            if (!isIntersecting || Number(page) >= productsCount) return;
            if (data && data?.products.length > 0) incrementPage();
        },
    });

    const isEmpty = Boolean(query.length) && !data?.products?.length;

    return {
        isEmpty,
        isLarge,
        isAuth: isAuthorized,
        products: data?.products ?? [],
        query,
        ref,
        isLoading: isLoading && isEmpty,
    };
};
