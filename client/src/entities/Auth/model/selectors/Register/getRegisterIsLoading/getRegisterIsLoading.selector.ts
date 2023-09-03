import { StateSchemaI } from '@/app/providers/StoreProvider';

export const getRegisterIsLoadingSelector = (state: StateSchemaI) =>
    state?.registerForm?.isLoading || false;
