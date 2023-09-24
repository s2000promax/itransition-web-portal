import { StateSchemaI } from '@/app/providers/StoreProvider';

export const getFeedbackListErrorSelector = (state: StateSchemaI) =>
    state.workDetailsPage?.feedbackList?.error;
