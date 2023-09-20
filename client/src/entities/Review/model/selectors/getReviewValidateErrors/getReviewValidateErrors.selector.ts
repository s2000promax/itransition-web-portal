import { StateSchemaI } from '@/app/providers/StoreProvider';

export const getReviewValidateErrorsSelector = (state: StateSchemaI) =>
    state.review?.validateErrors;
