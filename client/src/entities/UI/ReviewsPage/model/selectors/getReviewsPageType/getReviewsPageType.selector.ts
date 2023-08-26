import { StateSchemaI } from '@/app/providers/StoreProvider';
import { ReviewTypeEnums } from '@/entities/Review';

export const getReviewsPageTypeSelector = (state: StateSchemaI) =>
    state.reviewsPage?.type ?? ReviewTypeEnums.ALL;
