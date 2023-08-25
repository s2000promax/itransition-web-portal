import { StateSchemaI } from '@/app/providers/StoreProvider';
import { ReviewViewEnums } from '@/entities/Review';

export const getReviewsPageViewSelector = (state: StateSchemaI) =>
    state.reviewsPage?.view || ReviewViewEnums.SMALL;
