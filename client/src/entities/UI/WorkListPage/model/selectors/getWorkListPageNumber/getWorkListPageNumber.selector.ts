import { StateSchemaI } from '@/app/providers/StoreProvider';

export const getWorkListPageNumberSelector = (state: StateSchemaI) =>
    state.workListPage?.page || 1;
