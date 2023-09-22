import { StateSchemaI } from '@/app/providers/StoreProvider';

export const getDashboardErrorSelector = (state: StateSchemaI) =>
    state.dashboard?.error;
