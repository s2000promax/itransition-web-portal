import { StateSchemaI } from '@/app/providers/StoreProvider';

export const getProfileError = (state: StateSchemaI) => state.profile?.error;
