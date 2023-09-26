import { StateSchemaI } from '@/app/providers/StoreProvider';

export const getLoginIsFormValidSelector = (state: StateSchemaI) =>
    state.loginForm?.isFormValid;
