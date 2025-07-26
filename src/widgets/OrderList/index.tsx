import { Paper } from '@mantine/core';
import { useShallow } from 'zustand/react/shallow';

import { useCoffeeStore } from '@/entities/Product';

export const OrderList = () => {
    const [cart] = useCoffeeStore(useShallow((state) => [state.cart]));

    if (!cart.length) return null;

    return (
        <>
            {cart?.map((item) => (
                <Paper p='xs' shadow='xs' key={item.id}>
                    {item.name} {item.subTitle} : {item.quantity}
                </Paper>
            ))}
        </>
    );
};
