import { StateSchemaI } from '@/app/providers/StoreProvider';

export const getLikeErrorSelector = (state: StateSchemaI) => state.like?.error;
