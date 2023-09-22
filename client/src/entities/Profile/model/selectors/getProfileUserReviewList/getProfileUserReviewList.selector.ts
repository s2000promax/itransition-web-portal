import { StateSchemaI } from '@/app/providers/StoreProvider';

export const getProfileUserReviewListSelector = (state: StateSchemaI) =>
    state.profile?.userReviewList;
