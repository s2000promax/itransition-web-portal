import { StateSchemaI } from '@/app/providers/StoreProvider';
import { ViewEnums } from '@/entities/UI/UI';

export const getReviewListPageViewSelector = (state: StateSchemaI) =>
    state.reviewListPage?.view || ViewEnums.SMALL;
