import { StateSchemaI } from '@/app/providers/StoreProvider';

export const getReviewFormSelector = (state: StateSchemaI) =>
    state?.review?.form;
