import { StateSchemaI } from '@/app/providers/StoreProvider';

export const getRegisterFirstNameSelector = (state: StateSchemaI) =>
    state?.registerForm?.firstName || '';
