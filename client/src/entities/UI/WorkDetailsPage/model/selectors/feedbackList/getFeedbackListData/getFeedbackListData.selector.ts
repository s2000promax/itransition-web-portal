import { StateSchemaI } from '@/app/providers/StoreProvider';

export const getFeedbackListDataSelector = (state: StateSchemaI) =>
    state.workDetailsPage?.feedbackList?.data;
