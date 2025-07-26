import type { PropsWithChildren } from 'react';
import { Button } from '@mantine/core';

import { type OrderItem, setCoffeeCart } from '@/entities/Product';

interface AddItemToCartActionProps {
    item: OrderItem;
}

export const AddItemToCartAction = ({ children, item }: PropsWithChildren<AddItemToCartActionProps>) => (
    <Button onClick={() => setCoffeeCart(item)} fz='1rem' color='blue' fullWidth mt='md' radius='md'>
        {children}
    </Button>
);
