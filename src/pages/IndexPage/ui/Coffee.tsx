import { useEffect } from 'react';
import { AppShell, Burger, Button, Flex, Paper, Stack, Text, TextInput, Title } from '@mantine/core';
import { useDebouncedCallback, useDisclosure } from '@mantine/hooks';

import { CoffeeCard, useCoffeeStore } from '@/entities/Product';

import { AddItemToCartAction } from '@/features/AddItemToCartAction';

export function Coffee() {
    const [opened, { toggle }] = useDisclosure();
    const { getCoffeeList, list, searchInput, changeSearchInput, cart, orderCoffee } = useCoffeeStore();

    const handleSearch = useDebouncedCallback((query: string) => {
        getCoffeeList({
            text: query,
        });
    }, 500);

    useEffect(() => {
        getCoffeeList();
    }, [getCoffeeList]);

    return (
        <AppShell
            header={{ height: 100 }}
            aside={{ width: 300, breakpoint: 'md', collapsed: { mobile: !opened } }}
            padding='md'
        >
            <AppShell.Header>
                <Flex align='center' gap='md' h='100%' px='md'>
                    <TextInput
                        w='100%'
                        size='lg'
                        variant='filled'
                        type='search'
                        value={searchInput}
                        placeholder='Search'
                        onChange={(e) => {
                            changeSearchInput(e.target.value);
                            handleSearch(e.target.value);
                        }}
                    />
                    <Burger opened={opened} onClick={toggle} hiddenFrom='md' size='md' />
                </Flex>
            </AppShell.Header>
            <AppShell.Aside p='md'>
                <Title order={2}>Order:</Title>
                <Stack>
                    {cart?.map((item) => (
                        <Paper p='xs' shadow='xs' key={item.id}>
                            {item.name} {item.subTitle} : {item.quantity}
                        </Paper>
                    ))}
                    {cart.length > 0 && (
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
                    )}
                </Stack>
            </AppShell.Aside>
            <AppShell.Main>
                <Flex wrap='wrap' gap='1rem'>
                    {list?.map((coffee) => (
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
            </AppShell.Main>
        </AppShell>
    );
}
