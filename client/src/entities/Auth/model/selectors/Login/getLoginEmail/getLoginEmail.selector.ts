import { StateSchemaI } from '@/app/providers/StoreProvider';

export const getLoginEmailSelector = (state: StateSchemaI) =>
    state?.loginForm?.email || '';
