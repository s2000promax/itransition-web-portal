import { StateSchemaI } from '@/app/providers/StoreProvider';

export const getWorkListPageHasMoreSelector = (state: StateSchemaI) =>
    state.workListPage?.hasMore;
