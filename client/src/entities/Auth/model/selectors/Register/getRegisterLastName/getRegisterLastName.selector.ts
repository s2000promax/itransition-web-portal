import { StateSchemaI } from '@/app/providers/StoreProvider';

export const getRegisterLastNameSelector = (state: StateSchemaI) =>
    state?.registerForm?.lastName || '';
