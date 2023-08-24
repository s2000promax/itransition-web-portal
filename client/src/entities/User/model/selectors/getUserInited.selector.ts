import { StateSchemaI } from '@/app/providers/StoreProvider';

export const getUserInited = (state: StateSchemaI) => state.user._inited;
