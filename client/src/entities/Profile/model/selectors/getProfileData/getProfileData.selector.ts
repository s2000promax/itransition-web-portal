import { StateSchemaI } from '@/app/providers/StoreProvider';

export const getProfileData = (state: StateSchemaI) => state.profile?.data;
