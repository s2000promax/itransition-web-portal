import { StateSchemaI } from '@/app/providers/StoreProvider';

export const getUserDataSelector = (state: StateSchemaI) => state.user.userData;
