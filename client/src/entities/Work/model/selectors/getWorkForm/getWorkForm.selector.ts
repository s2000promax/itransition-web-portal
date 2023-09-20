import { StateSchemaI } from '@/app/providers/StoreProvider';

export const getWorkFormSelector = (state: StateSchemaI) => state.work?.form;
