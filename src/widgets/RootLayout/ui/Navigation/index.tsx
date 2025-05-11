import { List, ListItem, Paper } from '@mantine/core';

import { useIsLarge } from '@/shared/lib/hooks';

import { NavItem } from '../NavItem';
import { LARGE_SCREEN_NAV_ITEMS, NAV_ITEMS } from './constants';

import s from './Navigation.module.css';

export const Navigation = () => {
    const isLarge = useIsLarge();
    const navItems = isLarge ? LARGE_SCREEN_NAV_ITEMS : NAV_ITEMS;

    return (
        <Paper radius={0} bg='yellow.3' className={s.root}>
            <List className={s.list} px='xl' pt='xs' pb='md'>
                {navItems.map((item) => (
                    <ListItem className={s.item} key={item.id}>
                        <NavItem item={item} />
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
};
