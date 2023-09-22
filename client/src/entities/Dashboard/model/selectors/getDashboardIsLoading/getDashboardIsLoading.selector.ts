import { StateSchemaI } from '@/app/providers/StoreProvider';

export const getDashboardIsLoadingSelector = (state: StateSchemaI) =>
    state.dashboard?.isLoading;
