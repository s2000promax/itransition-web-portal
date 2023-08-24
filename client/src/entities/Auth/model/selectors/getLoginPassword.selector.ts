import { StateSchemaI } from '@/app/providers/StoreProvider';

export const getLoginPassword = (state: StateSchemaI) =>
    state?.loginForm?.password || '';
