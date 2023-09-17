import { StateSchemaI } from '@/app/providers/StoreProvider';

export const getWorkListPageErrorSelector = (state: StateSchemaI) =>
    state.workListPage?.error;
