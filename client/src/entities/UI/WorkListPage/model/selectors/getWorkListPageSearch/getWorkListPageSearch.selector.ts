import { StateSchemaI } from '@/app/providers/StoreProvider';

export const getWorkListPageSearchSelector = (state: StateSchemaI) =>
    state.workListPage?.search ?? '';
