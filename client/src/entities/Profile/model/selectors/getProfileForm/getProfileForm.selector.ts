import { StateSchemaI } from '@/app/providers/StoreProvider';

export const getProfileForm = (state: StateSchemaI) => state.profile?.form;
