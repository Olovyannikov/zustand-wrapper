import type { ComponentProps } from 'react';
import { Container, Paper } from '@mantine/core';

import { useIsLarge } from '@/shared/lib/hooks';

import { Desktop, Mobile } from './components';
import { MOBILE_NAVIGATION_HEIGHT } from './helpers';

import s from './Footer.module.css';

export const Footer = ({ className }: ComponentProps<'footer'>) => {
    const isLarge = useIsLarge();

    return (
        <Paper
            px='0'
            pt='lg'
            pb='sm'
            radius={0}
            bg='yellow.3'
            component='footer'
            className={className}
            mb={isLarge ? 0 : MOBILE_NAVIGATION_HEIGHT}
        >
            <Container className={s.container}>{isLarge ? <Desktop /> : <Mobile />}</Container>
        </Paper>
    );
};
