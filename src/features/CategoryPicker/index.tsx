import { SegmentedControl } from '@mantine/core';
import { useShallow } from 'zustand/react/shallow';

import { setParams, useCoffeeStore } from '@/entities/Product';
import { CoffeeType } from '@/entities/Product/types';

export const CategoryPicker = () => {
    const [params] = useCoffeeStore(useShallow((state) => [state.params]));

    return (
        <SegmentedControl
            value={params?.type ?? ''}
            onChange={(value) =>
                value &&
                setParams({
                    type: CoffeeType[value as keyof typeof CoffeeType],
                })
            }
            data={Object.keys(CoffeeType).map((key) => ({
                label: CoffeeType[key as keyof typeof CoffeeType],
                value: CoffeeType[key as keyof typeof CoffeeType],
            }))}
        />
    );
};
