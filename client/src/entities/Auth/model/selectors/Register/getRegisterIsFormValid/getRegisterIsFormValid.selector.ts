import { StateSchemaI } from '@/app/providers/StoreProvider';

export const getRegisterIsFormValidSelector = (state: StateSchemaI) =>
    state.registerForm?.isFormValid;
