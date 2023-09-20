import { StateSchemaI } from '@/app/providers/StoreProvider';
import { WorkTypeEnums } from '@/entities/Work';

export const getReviewListPageTypeSelector = (state: StateSchemaI) =>
    state.reviewListPage?.type ?? WorkTypeEnums.ALL;
