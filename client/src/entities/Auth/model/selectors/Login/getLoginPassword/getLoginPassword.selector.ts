import { StateSchemaI } from '@/app/providers/StoreProvider';

export const getLoginPasswordSelector = (state: StateSchemaI) =>
    state?.loginForm?.password || '';
