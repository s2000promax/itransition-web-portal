import { StateSchemaI } from '@/app/providers/StoreProvider';

export const getTagListIsLoadingSelector = (state: StateSchemaI) =>
    state.tag?.isLoading || false;
