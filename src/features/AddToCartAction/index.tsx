import { useNavigate } from 'react-router';
import { Button, Flex, Text } from '@mantine/core';
import { IconMinus, IconPlus } from '@tabler/icons-react';

import { useCartModel } from '@/entities/Cart';
import { type ProductModel } from '@/entities/Product';
import { useUserModel } from '@/entities/User';

interface CartButtonProps {
    product: ProductModel;
    className?: string;
}

export const CartButton = ({ product, className }: CartButtonProps) => {
    const navigate = useNavigate();

    const { cart } = useCartModel.use();
    const addProductToCart = useCartModel.addProductToCart;
    const removeProductFromCart = useCartModel.removeProductFromCart;

    const { isAuthorized: isAuth } = useUserModel.use();

    const existedProductInCart = cart.find((el) => el.product.id === product.id);

    const isCartButtonDisabled = cart.find((el) => el.product.id === product.id)?.count === product.stock;

    if (existedProductInCart) {
        return (
            <Flex
                align='center'
                w='fit-content'
                className={className}
                styles={{ root: { border: '1px solid lightgrey', borderRadius: 'var(--size-xl)' } }}
            >
                <Button
                    p='xs'
                    fz='lg'
                    fw='bold'
                    c='black'
                    variant='transparent'
                    onClick={() => removeProductFromCart(product)}
                >
                    <IconMinus />
                </Button>
                <Text fw='bold' span miw={20} ta='center'>
                    {cart.find((current) => current.product.id === product.id)?.count}
                </Text>
                <Button
                    p='xs'
                    fz='lg'
                    c={isCartButtonDisabled ? 'gray.4' : 'black'}
                    fw='bold'
                    bg='transparent'
                    variant='transparent'
                    disabled={isCartButtonDisabled}
                    onClick={() => addProductToCart(product)}
                >
                    <IconPlus />
                </Button>
            </Flex>
        );
    }

    return (
        <Button
            c='black'
            bg='yellow.4'
            radius='50px'
            size='md'
            w='fit-content'
            onClick={() => (isAuth ? addProductToCart(product) : navigate('/sign-in'))}
        >
            В корзину
        </Button>
    );
};
