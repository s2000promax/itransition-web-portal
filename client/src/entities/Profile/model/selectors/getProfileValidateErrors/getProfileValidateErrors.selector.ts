import { StateSchemaI } from '@/app/providers/StoreProvider';

export const getProfileValidateErrors = (state: StateSchemaI) =>
    state.profile?.validateErrors;
