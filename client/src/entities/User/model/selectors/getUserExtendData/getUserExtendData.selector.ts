import { StateSchemaI } from '@/app/providers/StoreProvider';

export const getUserExtendDataSelector = (state: StateSchemaI) =>
    state.user.extendData;
