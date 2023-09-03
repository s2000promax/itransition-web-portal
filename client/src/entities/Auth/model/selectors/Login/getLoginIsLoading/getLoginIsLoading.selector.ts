import { StateSchemaI } from '@/app/providers/StoreProvider';

export const getLoginIsLoadingSelector = (state: StateSchemaI) =>
    state?.loginForm?.isLoading || false;
