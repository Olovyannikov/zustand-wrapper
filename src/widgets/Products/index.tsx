import { Grid, Text } from '@mantine/core';

import { getDeclinations } from '@/shared/lib/utils';
import { PageLoader } from '@/shared/ui';

import { ProductCard } from '@/entities/Product';

import { CartButton } from '@/features/AddToCartAction';
import { FavoriteButton } from '@/features/AddToFavoritesAction';

// import { ProductsPagination } from '@/features/ProductsPagination';
// import { SortBar } from '@/features/Sort';
import { useProductsWidget } from './view-model.ts';

export const Products = () => {
    const { ref, isAuth, isLoading, products, query, isLarge, isEmpty } = useProductsWidget();

    const isProductsShown = !isLoading && !isEmpty;

    if (isLoading) return <PageLoader />;

    return (
        <>
            {!isEmpty && query.length > 0 && (
                <Text pt='lg' fz={isLarge ? 28 : 24}>
                    По запросу&nbsp;
                    <Text span fw='800' fz={isLarge ? 28 : 24}>
                        {query}
                    </Text>
                    &nbsp;
                    {getDeclinations({
                        count: products?.length ?? 0,
                        few: 'найдено',
                        many: 'найдено',
                        one: 'найден',
                        withoutCount: true,
                    })}
                    &nbsp;
                    {getDeclinations({
                        count: products?.length ?? 0,
                        few: 'товара',
                        many: 'товаров',
                        one: 'товар',
                    })}
                </Text>
            )}
            {isEmpty && 'По запросу ' + query + ' ничего не найдено'}
            {/*<SortBar />*/}
            {isProductsShown && (
                <>
                    <Grid py={isLarge ? '4xl' : 'lg'} gutter={isLarge ? 'md' : 'xs'}>
                        {products?.map((product) => (
                            <Grid.Col
                                span={{
                                    xs: 12,
                                    sm: 6,
                                    md: 3,
                                }}
                                key={product.id}
                            >
                                <ProductCard
                                    {...product}
                                    isAuth={isAuth}
                                    actionSlot={<CartButton product={product} />}
                                    favoriteActionSlot={<FavoriteButton productId={product.id} />}
                                />
                            </Grid.Col>
                        ))}
                    </Grid>
                    {ref && <div ref={ref} />}
                    {/*<ProductsPagination />*/}
                </>
            )}
        </>
    );
};
