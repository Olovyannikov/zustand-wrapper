import { store } from '@davstack/store';
import { isNil, omitBy } from 'lodash-es';

import { getSearchParams } from '@/shared/lib/utils';

import { getProductsQuery } from '@/entities/Product';

import type { ProductModel } from '../types';

interface ProductModelState {
    products: ProductModel[];
    productsCount: number;
}

export const useProductModel = store<ProductModelState>().state({
    products: [] as ProductModel[],
    productsCount: 1,
});

export const productsLoader = async ({ request }: { request: { url: string } }) => {
    const params = getSearchParams({
        url: request.url,
        keys: ['sort', 'searchTerm', 'ratings', 'minPrice', 'maxPrice', 'categoryId', 'perPage', 'page'],
    });

    const { execute } = getProductsQuery.getState();
    await execute(omitBy({ ...params, sort: params.sort ?? 'high-price', perPage: params.perPage ?? 12 }, isNil));

    return null;
};
