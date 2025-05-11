import type { ProductModel } from '@/entities/Cart/@x';

export interface LikeModel {
    id: string;
    userId: string;
    productId: string;
    product: ProductModel;
}

export interface UserModel {
    id: string;
    email: string;
    name: string;
    avatarPath: string;
    about: string;
    phone: string;
    roles: string[];
    likes: LikeModel[];
    password: string;
    // favoritesPost: any[];
}
