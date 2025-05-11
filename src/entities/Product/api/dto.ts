import type { LikeModel } from '@/entities/User/@x';

import type { ProductModel } from '../types';

export type ProductBySlugResponseDTO = ProductModel;

export interface ProductWithLikeResponseDTO {
    message: string;
    like: LikeModel;
}

export interface RemoveProductWithLikeResponseDTO {
    message: string;
    product: LikeModel;
}

export interface ProductsRequestDTO {
    sort: 'high-price' | 'low-price' | 'newest' | 'oldest' | null;
    searchTerm: string | null;
    ratings: string | null;
    minPrice: string | null;
    maxPrice: string | null;
    categoryId: string | null;
    perPage: string | null;
    page: string | null;
}

export interface ProductsResponseDTO {
    products: ProductModel[];
    length: number;
}

export interface ProductCreateRequestDTO {
    name: string;
    description: string;
    price: number;
    images: string;
    discount: number;
    stock: number;
    wight: string;
    tags: string[];
    isPublished: boolean;
    categoryId: number;
}
