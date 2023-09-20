import { StateSchemaI } from '@/app/providers/StoreProvider';

export const getRegisterEmailSelector = (state: StateSchemaI) =>
    state?.registerForm?.email || '';
