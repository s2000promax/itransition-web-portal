import { StateSchemaI } from '@/app/providers/StoreProvider';

export const getWorkValidateErrorsSelector = (state: StateSchemaI) =>
    state.work?.validateErrors;
