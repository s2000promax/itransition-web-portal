import { StateSchemaI } from '@/app/providers/StoreProvider';

export const getLikeIsLoadingSelector = (state: StateSchemaI) =>
    state.like?.isLoading || false;
