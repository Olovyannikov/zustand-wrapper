import { Button } from '@mantine/core';
import { useShallow } from 'zustand/react/shallow';

import { orderCoffee, useCoffeeStore } from '@/entities/Product';

export const CreateOrderAction = () => {
    const [cart] = useCoffeeStore(useShallow((state) => [state.cart]));

    if (cart.length === 0) return null;

    return (
        <Button
            onClick={() =>
                orderCoffee({
                    orderItems: cart,
                    address: 'Address',
                })
            }
        >
            Order
        </Button>
    );
};
