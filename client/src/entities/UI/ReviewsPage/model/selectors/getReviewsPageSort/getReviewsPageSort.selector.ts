import { StateSchemaI } from '@/app/providers/StoreProvider';
import { ReviewSortFieldEnums } from '@/entities/Review';

export const getReviewsPageSortSelector = (state: StateSchemaI) =>
    state.reviewsPage?.sort ?? ReviewSortFieldEnums.CREATED;
