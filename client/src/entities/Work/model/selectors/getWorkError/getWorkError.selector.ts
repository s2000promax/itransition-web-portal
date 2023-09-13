import { StateSchemaI } from '@/app/providers/StoreProvider';

export const getWorkErrorSelector = (state: StateSchemaI) => state.work?.error;
