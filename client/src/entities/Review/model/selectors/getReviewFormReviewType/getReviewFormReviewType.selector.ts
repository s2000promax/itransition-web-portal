import { StateSchemaI } from '@/app/providers/StoreProvider';
import { WorkTypeEnums } from '@/entities/Work';

export const getReviewFormReviewTypeSelector = (state: StateSchemaI) =>
    state.review?.form?.type || WorkTypeEnums.ALL;
