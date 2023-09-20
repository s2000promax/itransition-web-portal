import { StateSchemaI } from '@/app/providers/StoreProvider';
import { WorkTypeEnums } from '@/entities/Work';

export const getWorkListPageTypeSelector = (state: StateSchemaI) =>
    state.workListPage?.type ?? WorkTypeEnums.ALL;
