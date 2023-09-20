import { StateSchemaI } from '@/app/providers/StoreProvider';

export const getLoginErrorSelector = (state: StateSchemaI) =>
    state?.loginForm?.error;
