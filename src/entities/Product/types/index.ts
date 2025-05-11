import type { LikeModel, UserModel } from '@/entities/User/@x';

interface Category {
    id: number;
    name: string;
    slug: string;
}

export interface ProductModel {
    id: string;
    createdAt: string;
    updatedAt: string;
    name: string;
    slug: string;
    description: string;
    price: number;
    images: string;
    discount: number;
    stock: number;
    wight: string;
    isPublished: boolean;
    likes: LikeModel[];
    category: Category;
    user: UserModel;
    // tags: any[];
    // reviews: any[];
}
