import { StateSchemaI } from '@/app/providers/StoreProvider';

export const getLoginError = (state: StateSchemaI) => state?.loginForm?.error;
