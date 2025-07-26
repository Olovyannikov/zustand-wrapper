import { useEffect } from 'react';
import { TextInput } from '@mantine/core';
import { useShallow } from 'zustand/react/shallow';

import { useUrlParamsStore } from '@/shared/lib/hooks';

import { getCoffeeList, setParams, useCoffeeStore } from '@/entities/Product';

export const CoffeeSearchInput = () => {
    const [params] = useCoffeeStore(useShallow((state) => [state.params]));
    useEffect(() => {
        getCoffeeList({ ...params });
    }, [params]);
    useUrlParamsStore(params as Record<string, string>, setParams);

    return (
        <TextInput
            w='100%'
            size='lg'
            variant='filled'
            type='search'
            value={params?.text}
            placeholder='Search'
            onChange={(e) => {
                setParams({
                    text: e.target.value,
                });
            }}
        />
    );
};
