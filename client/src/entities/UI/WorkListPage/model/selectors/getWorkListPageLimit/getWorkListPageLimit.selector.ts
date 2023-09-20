import { StateSchemaI } from '@/app/providers/StoreProvider';

export const getWorkListPageLimitSelector = (state: StateSchemaI) =>
    state.workListPage?.limit || 9;
