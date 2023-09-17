import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { LikeI } from '@/entities/Like/model/types/like.interface';

export const likeUserByReviewService = createAsyncThunk<
    void,
    LikeI,
    ThunkConfig<string>
>('like/likeUserByReview', async (like, thunkApi) => {
    const { extra, rejectWithValue, getState, dispatch } = thunkApi;

    try {
        await extra.api.post('rate/review', like);
    } catch (e) {
        console.log(e);
        return rejectWithValue('Failed to like review');
    }
});
