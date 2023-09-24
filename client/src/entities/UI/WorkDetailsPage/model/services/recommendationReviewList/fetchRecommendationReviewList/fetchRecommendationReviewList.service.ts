import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { ReviewI } from '@/entities/Review';

export const fetchRecommendationReviewListService = createAsyncThunk<
    ReviewI[],
    string,
    ThunkConfig<string>
>('workDetailsPage/fetchRecommendationReviewList', async (workId, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.get<ReviewI[]>(
            'review/recommendation/byWorkId',
            {
                params: {
                    _limit: 2,
                    _page: 1,
                    _workId: workId,
                },
            },
        );

        if (!response.data) {
            throw new Error();
        }

        return response.data;
    } catch (e) {
        return rejectWithValue('error');
    }
});
