import { Flex, Text } from '@mantine/core';
import { useShallow } from 'zustand/react/shallow';

import { CoffeeCard, useCoffeeStore } from '@/entities/Product';

import { AddItemToCartAction } from '@/features/AddItemToCartAction';

export const ProductsList = () => {
    const [coffeeList] = useCoffeeStore(useShallow((state) => [state.coffeeList]));

    if (!coffeeList) return null;

    return (
        <Flex wrap='wrap' gap='1rem'>
            {coffeeList?.map((coffee) => (
                <CoffeeCard
                    key={coffee.id}
                    {...coffee}
                    actionSlot={
                        <AddItemToCartAction item={{ ...coffee, size: 'L', quantity: 1 }}>
                            {coffee.price}&nbsp;<Text ff='system-ui'>₽</Text>
                        </AddItemToCartAction>
                    }
                />
            ))}
        </Flex>
    );
};
