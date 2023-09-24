import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { FeedbackI } from '@/entities/FeedBack';

export const fetchFeedbackListService = createAsyncThunk<
    FeedbackI[],
    string,
    ThunkConfig<string>
>('workDetailsPage/fetchFeedbackList', async (workId, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.get<FeedbackI[]>('rate/feedbackList', {
            params: {
                _workId: workId,
            },
        });

        if (!response.data) {
            throw new Error();
        }

        return response.data;
    } catch (e) {
        return rejectWithValue('error');
    }
});
