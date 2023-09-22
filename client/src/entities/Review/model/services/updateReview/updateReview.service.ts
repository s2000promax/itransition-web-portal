import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { FormDataI } from '../../types/review.interface';

export const updateReviewService = createAsyncThunk<
    void,
    FormDataI,
    ThunkConfig<string>
>('review/update', async (reviewFormData, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.put('review/update', reviewFormData);

        if (response.status !== 200) {
            return rejectWithValue('error');
        }
    } catch (e) {
        return rejectWithValue('error');
    }
});
