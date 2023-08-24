import { StateSchemaI } from '@/app/providers/StoreProvider';

export const getLoginUsername = (state: StateSchemaI) =>
    state?.loginForm?.username || '';
