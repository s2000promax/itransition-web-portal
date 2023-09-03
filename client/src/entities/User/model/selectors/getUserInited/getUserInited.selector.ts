import { StateSchemaI } from '@/app/providers/StoreProvider';

export const getUserInitedSelector = (state: StateSchemaI) =>
    state.user._inited;
