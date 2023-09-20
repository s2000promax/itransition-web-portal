import { StateSchemaI } from '@/app/providers/StoreProvider';
import { ViewEnums } from '@/entities/UI/UI';

export const getWorkListPageViewSelector = (state: StateSchemaI) =>
    state.workListPage?.view || ViewEnums.SMALL;
