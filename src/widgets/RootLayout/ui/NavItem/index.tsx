import type { ReactNode } from 'react';
import { Link } from 'react-router';
import { Indicator, Text } from '@mantine/core';

import { useIsLarge } from '@/shared/lib/hooks';

import { useCartModel } from '@/entities/Cart';
import { getUserByIdQuery, useUserModel } from '@/entities/User';

import s from './NavItem.module.css';

const pathWithIndicator = (path: string) => path === '/favorites' || path === '/cart';
const isFavoritesPath = (path: string) => path === '/favorites';

interface NavigationItemProps {
    item:
        | {
              id: number;
              name: string;
              path: string;
              icon: ReactNode;
              hideOnLarge: boolean;
              testId?: string;
              protectedPath?: undefined;
          }
        | {
              id: number;
              name: string;
              path: string;
              icon: ReactNode;
              hideOnLarge: boolean;
              testId?: string;
              protectedPath: string;
          };
    isAuthorized?: boolean;
}

export const NavItem = ({ item }: NavigationItemProps) => {
    const isLarge = useIsLarge();

    const { cartProductsCount } = useCartModel.use();
    const { isAuthorized } = useUserModel.use();
    const { data } = getUserByIdQuery.getState();

    const favoritesCount = data?.likes?.length ?? 0;

    const Wrapper = ({ children, path }: { children: ReactNode; path: string }) => {
        if (pathWithIndicator(path)) {
            return (
                <Indicator
                    top={0}
                    offset={4}
                    display='flex'
                    size='var(--size-sm)'
                    className={s.indicator}
                    label={isFavoritesPath(path) ? favoritesCount : cartProductsCount}
                    disabled={isFavoritesPath(path) ? favoritesCount < 1 : cartProductsCount < 1}
                >
                    {children}
                </Indicator>
            );
        }

        return <>{children}</>;
    };

    if (!isAuthorized && item.protectedPath) {
        return (
            <Link to={item.protectedPath} data-testid={item.testId}>
                {item.icon}
                {isLarge ? null : <Text fz={9}>{item.name}</Text>}
            </Link>
        );
    }

    return (
        <Link to={item.path}>
            <Wrapper path={item.path}>
                {item.icon}
                {isLarge ? null : <Text fz={9}>{item.name}</Text>}
            </Wrapper>
        </Link>
    );
};
