import type { ComponentProps } from 'react';
import { Link } from 'react-router';
import { Container, Flex, Paper } from '@mantine/core';

import Logo from '@/shared/assets/images/logo.svg?react';
import LogoSM from '@/shared/assets/images/logo-sm.svg?react';
import { useIsLarge } from '@/shared/lib/hooks';

import { SearchBar } from '@/features/SearchBar';

import { Navigation } from '../Navigation';

import s from './Header.module.css';

export const Header = ({ className }: ComponentProps<'header'>) => {
    const isLarge = useIsLarge();

    return (
        <Paper
            px='sm'
            py='md'
            radius={0}
            bg='yellow.3'
            component='header'
            className={className}
            data-testid='RootLayout__Header'
        >
            <Container>
                <Flex className={s.box} align='center' gap={isLarge ? 56 : '3xl'}>
                    <Link to='/'>{isLarge ? <Logo /> : <LogoSM />}</Link>
                    <SearchBar />
                    <Navigation />
                </Flex>
            </Container>
        </Paper>
    );
};
