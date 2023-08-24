import { StateSchemaI } from '@/app/providers/StoreProvider';

export const getLoginIsLoading = (state: StateSchemaI) =>
    state?.loginForm?.isLoading || false;
