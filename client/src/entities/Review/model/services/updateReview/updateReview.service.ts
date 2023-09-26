import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { FormDataI } from '../../types/review.interface';
import { getReviewFormSelector } from '@/entities/Review';

export const updateReviewService = createAsyncThunk<
    void,
    FormDataI,
    ThunkConfig<string>
>('review/update', async (reviewFormData, thunkApi) => {
    const { extra, getState, rejectWithValue } = thunkApi;

    const formData = getReviewFormSelector(getState());

    try {
        const response = await extra.api.put('review/update', formData);

        if (response.status !== 200) {
            return rejectWithValue('error');
        }
    } catch (e) {
        return rejectWithValue('error');
    }
});
