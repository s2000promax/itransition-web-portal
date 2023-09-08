import { StateSchemaI } from '@/app/providers/StoreProvider';
import { ReviewTypeEnums } from '@/entities/Review';

export const getReviewFormReviewTypeSelector = (state: StateSchemaI) =>
    state.review?.form?.type || ReviewTypeEnums.ALL;
