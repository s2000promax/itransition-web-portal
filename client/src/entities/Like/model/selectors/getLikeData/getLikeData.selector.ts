import { StateSchemaI } from '@/app/providers/StoreProvider';

export const getLikeDataSelector = (state: StateSchemaI) => state.like?.data;
