import { StateSchemaI } from '@/app/providers/StoreProvider';

export const getWorkListPageIsLoadingSelector = (state: StateSchemaI) =>
    state.workListPage?.isLoading || false;
