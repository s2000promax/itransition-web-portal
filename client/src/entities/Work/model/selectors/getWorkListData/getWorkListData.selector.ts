import { StateSchemaI } from '@/app/providers/StoreProvider';

export const getWorkListDataSelector = (state: StateSchemaI) =>
    state.work?.entities;
