import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { FormDataI, ReviewI } from '../../types/review.interface';

export const createReviewService = createAsyncThunk<
    void,
    FormDataI,
    ThunkConfig<string>
>('review/create', async (reviewFormData, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
        await extra.api.post<ReviewI>('review/create', reviewFormData);
    } catch (e) {
        return rejectWithValue('error');
    }
});
