import { createInternalRequestFx, HTTP_METHODS } from '@/shared/api';

import type {
    ProductsRequestDTO,
    ProductsResponseDTO,
    ProductWithLikeResponseDTO,
    RemoveProductWithLikeResponseDTO,
} from './dto';

export const getProductsQuery = createInternalRequestFx<Partial<ProductsRequestDTO>, ProductsResponseDTO>((params) => ({
    url: `/products`,
    params,
}));

export const setProductLikeMutation = createInternalRequestFx<string, ProductWithLikeResponseDTO>((id) => ({
    url: `/products/${id}/likes`,
    method: HTTP_METHODS.PUT,
}));

export const removeProductLikeMutation = createInternalRequestFx<string, RemoveProductWithLikeResponseDTO>((id) => ({
    url: `/products/${id}/likes`,
    method: HTTP_METHODS.DELETE,
}));
