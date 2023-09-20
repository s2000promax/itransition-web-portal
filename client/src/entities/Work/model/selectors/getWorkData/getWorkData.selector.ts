import { StateSchemaI } from '@/app/providers/StoreProvider';

export const getWorkDataSelector = (state: StateSchemaI) => state.work?.data;
