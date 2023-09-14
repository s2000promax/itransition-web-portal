import { StateSchemaI } from '@/app/providers/StoreProvider';
import { WorkTypeEnums } from '@/entities/Work';

export const getReviewsPageTypeSelector = (state: StateSchemaI) =>
    state.reviewsPage?.type ?? WorkTypeEnums.ALL;
