import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { ReviewI } from '@/entities/Review';

export const fetchRecommendationsService = createAsyncThunk<
    ReviewI[],
    void,
    ThunkConfig<string>
>('reviewDetailsPage/fetchReviewsRecommendations', async (props, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;
    console.log('########FETCH');
    try {
        const response = await extra.api.get<ReviewI[]>('review/reviewList', {
            params: {
                _limit: 4,
                _expand: 'user',
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
