import { StateSchemaI } from '@/app/providers/StoreProvider';

export const getRegisterErrorSelector = (state: StateSchemaI) =>
    state?.registerForm?.error;
