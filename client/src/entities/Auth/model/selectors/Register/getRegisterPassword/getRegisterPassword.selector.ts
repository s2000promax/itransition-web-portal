import { StateSchemaI } from '@/app/providers/StoreProvider';

export const getRegisterPasswordSelector = (state: StateSchemaI) =>
    state?.registerForm?.password || '';
