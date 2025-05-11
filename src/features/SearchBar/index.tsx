import { CloseButton, Input } from '@mantine/core';

import { useFiltersModel } from '../../entities/Filter';

export const SearchBar = () => {
    const { search } = useFiltersModel.use();
    const searchChanged = useFiltersModel.searchChanged;

    return (
        <Input
            pos='relative'
            radius='500px'
            size='lg'
            w='100%'
            maw={468}
            styles={{
                input: {
                    fontSize: 'var(--size-md)',
                },
            }}
            placeholder='Найти товар'
            value={search}
            onChange={(event) => searchChanged(event.currentTarget.value)}
            rightSectionPointerEvents='all'
            rightSection={
                <CloseButton
                    bg='gray.4'
                    c='white'
                    pos='absolute'
                    right={20}
                    size='xs'
                    radius='100%'
                    aria-label='Очистить поле ввода'
                    onClick={() => searchChanged('')}
                    style={{ display: search ? undefined : 'none' }}
                />
            }
        />
    );
};
