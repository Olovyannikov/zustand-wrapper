import type { FormEventHandler } from 'react';
import { Button, Card, Checkbox, Container, Flex, Group, Stack, Text, TextInput } from '@mantine/core';

import { useTodosStore } from '@/pages/IndexPage/model';

import { RootLayout } from '@/widgets/RootLayout';

export default function IndexPage() {
    const { todos, currentValue, currentValueSettled, addTodo, completeToggled } = useTodosStore();

    const onSubmitForm: FormEventHandler<HTMLDivElement> = (e) => {
        e.preventDefault();
        addTodo({
            id: String(Number(todos.at(-1)?.id ?? 0) + 1),
            text: currentValue,
        });
    };

    return (
        <RootLayout>
            <Container>
                <Stack mt='50vh' justify='center' gap='xl' align='center'>
                    <Flex component='form' onSubmit={onSubmitForm}>
                        <TextInput
                            variant='filled'
                            placeholder='Add Todo...'
                            value={currentValue}
                            onChange={(e) => currentValueSettled(e.target.value)}
                        />
                        <Button type='submit'>Add Todo</Button>
                    </Flex>
                    <Stack>
                        {todos.map((todo) => (
                            <Card key={todo.id}>
                                <Group component='label'>
                                    <Checkbox onChange={() => completeToggled(todo.id)} checked={todo.isComplete} />
                                    <Text>{todo.title}</Text>
                                </Group>
                            </Card>
                        ))}
                    </Stack>
                </Stack>
            </Container>
        </RootLayout>
    );
}
