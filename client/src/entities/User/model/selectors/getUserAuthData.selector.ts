import { StateSchemaI } from '@/app/providers/StoreProvider';

export const getUserAuthData = (state: StateSchemaI) => state.user.authData;
