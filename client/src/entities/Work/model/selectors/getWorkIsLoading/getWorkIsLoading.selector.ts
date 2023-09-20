import { StateSchemaI } from '@/app/providers/StoreProvider';

export const getWorkIsLoadingSelector = (state: StateSchemaI) =>
    state.work?.isLoading;
