import type { ProductModel } from '@/entities/Product/@x';

export interface Cart {
    product: ProductModel;
    count: number;
}
