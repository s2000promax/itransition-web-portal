import { StateSchemaI } from '@/app/providers/StoreProvider';

export const getWorkListPageOrderSelector = (state: StateSchemaI) =>
    state.workListPage?.order ?? 'asc';
