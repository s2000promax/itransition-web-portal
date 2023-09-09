import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { FormDataI, ReviewSchemaI } from '../../types/review.interface';

type CreateReviewServiceProps = FormDataI;

export const createReviewService = createAsyncThunk<
    void,
    CreateReviewServiceProps,
    ThunkConfig<string>
>('register', async (reviewFormData, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.post<ReviewSchemaI>(
            'review/create',
            reviewFormData,
        );
        console.log('ReviewCreate', response);
        if (response.status !== 200) {
            return rejectWithValue('error');
        }
    } catch (e) {
        return rejectWithValue('error');
    }
});
