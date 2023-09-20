import { StateSchemaI } from '@/app/providers/StoreProvider';

export const getWorkReadonlySelector = (state: StateSchemaI) =>
    state.work?.readonly;
