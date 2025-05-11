import { store } from '@davstack/store';

interface FilterModelState {
    search: '';
    query: '';
}

export const useFiltersModel = store<FilterModelState>()
    .state({
        search: '',
    })
    .actions((store) => ({
        searchChanged: (value: string) => store.search.set(value),
    }));
