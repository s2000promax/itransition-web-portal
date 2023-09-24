import { StateSchemaI } from '@/app/providers/StoreProvider';

export const getFeedbackListIsLoadingSelector = (state: StateSchemaI) =>
    state.workDetailsPage?.feedbackList?.isLoading;
