import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { ReviewI } from '../../types/review.interface';

export const fetchReviewByIdService = createAsyncThunk<
    ReviewI,
    string | undefined,
    ThunkConfig<string>
>('review/fetchReviewById', async (reviewId, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    if (!reviewId) {
        throw new Error('');
    }

    try {
        const response = await extra.api.get<ReviewI>(`review/${reviewId}`, {
            params: {
                _expand: 'user',
            },
        });

        if (!response.data) {
            throw new Error();
        }

        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue('error');
    }
});
