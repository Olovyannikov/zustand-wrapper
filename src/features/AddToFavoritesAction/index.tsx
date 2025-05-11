import { useState } from 'react';
import { ActionIcon } from '@mantine/core';
import { IconHeart } from '@tabler/icons-react';
import { useTimeout } from 'usehooks-ts';

import { removeProductLikeMutation, setProductLikeMutation } from '@/entities/Product';
import { getUserByIdQuery } from '@/entities/User';

interface FavoriteButtonProps {
    productId: string;
}

export const FavoriteButton = ({ productId }: FavoriteButtonProps) => {
    const [loading, setLoading] = useState<boolean>(false);
    const { data } = getUserByIdQuery.getState();

    const removeLike = removeProductLikeMutation.getState().execute;
    const setLike = setProductLikeMutation.getState().execute;

    const hideLoader = () => setLoading(false);
    useTimeout(hideLoader, loading ? 1000 : 0);

    const isFavoritesSettled = data?.likes.map((el) => el.product).find((el) => el.id === productId);

    return (
        <ActionIcon
            variant='subtle'
            onClick={() => {
                setLoading(true);
                isFavoritesSettled ? removeLike(productId) : setLike(productId);
            }}
            pos='absolute'
            top={0}
            right={0}
            loading={loading}
        >
            <IconHeart fill={isFavoritesSettled ? 'var(--mantine-color-yellow-4)' : 'transparent'} />
        </ActionIcon>
    );
};
