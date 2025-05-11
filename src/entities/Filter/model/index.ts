import { store } from '@davstack/store';

interface FilterModelState {
    search: '';
    query: '';
}

export const useFiltersModel = store<FilterModelState>()
    .state({
        search: '',
        query: '',
        page: 1,
    })
    .actions((store) => ({
        searchChanged: (value: string) => store.search.set(value),
        incrementPage: () => store.page.set(store.page.get() + 1),
    }));
