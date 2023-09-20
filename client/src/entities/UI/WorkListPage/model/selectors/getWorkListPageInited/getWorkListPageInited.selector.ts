import { StateSchemaI } from '@/app/providers/StoreProvider';

export const getWorkListPageInitedSelector = (state: StateSchemaI) =>
    state.workListPage?._inited;
