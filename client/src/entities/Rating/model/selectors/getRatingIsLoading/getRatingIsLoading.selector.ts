import { StateSchemaI } from '@/app/providers/StoreProvider';

export const getRatingIsLoadingSelector = (state: StateSchemaI) =>
    state.rating?.isLoading || false;
