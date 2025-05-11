import type { ReactNode } from 'react';
import { Link } from 'react-router';
import { Anchor, Box, Stack, Text, Title } from '@mantine/core';

import { useIsLarge } from '@/shared/lib/hooks';

interface ProductProps {
    id: string;
    slug: string;
    images: string;
    description: string;
    price: number;
    stock: number;
    name: string;
    discount: null | number;
    isAuth?: boolean;
    onFavorite?: (payload: string) => void;
    onRemoveFavorite?: (payload: string) => void;
    actionSlot?: ReactNode;
    favoriteActionSlot?: ReactNode;
}

export const ProductCard = ({
    name,
    images,
    description,
    price,
    stock,
    actionSlot,
    discount,
    slug,
    isAuth = false,
    favoriteActionSlot,
}: ProductProps) => {
    const isLarge = useIsLarge();

    const discountPrice = discount ? price - price * (discount / 100) : price;

    return (
        <Box pos='relative'>
            {isAuth && favoriteActionSlot}
            <Anchor component={Link} c='black' to={`/product/${slug}`} state={{ slug }}>
                <Stack gap='sm' mb='xl'>
                    <picture>
                        <img
                            width={isLarge ? 236 : 168}
                            height={isLarge ? 187 : 125}
                            src={images}
                            alt={`${description} изображение`}
                        />
                    </picture>
                    <Box pt='sm' pos='relative'>
                        {discount ? (
                            <Text style={{ position: 'absolute' }} top={-4} td='line-through' fz='sm'>
                                {price}&nbsp;
                                <Text fz='sm' span ff='Verdana, system-ui'>
                                    ₽
                                </Text>
                            </Text>
                        ) : null}
                        <Text c={discount ? 'red' : 'black'} fw='800' mb='xs'>
                            {discountPrice}&nbsp;
                            <Text fw={800} span ff='Verdana, system-ui'>
                                ₽
                            </Text>
                        </Text>
                        <Text c='dimmed' mb='xxs'>
                            {stock} шт
                        </Text>
                        <Title mih='4xl' mah='4xl' lh='20px' fw={600} lineClamp={2} order={4} fz='md'>
                            {name}
                        </Title>
                    </Box>
                </Stack>
            </Anchor>
            {actionSlot}
        </Box>
    );
};
