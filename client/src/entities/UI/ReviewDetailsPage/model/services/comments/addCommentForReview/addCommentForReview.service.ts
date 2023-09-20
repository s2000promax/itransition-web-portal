import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUserDataSelector } from '@/entities/User';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { CommentI } from '@/entities/Comment';
import { getReviewDataSelector } from '@/entities/Review';
import { fetchCommentsByReviewIdService } from '../fetchCommentsByReviewId/fetchCommentsByReviewId.service';

export const addCommentForReviewService = createAsyncThunk<
    CommentI,
    string,
    ThunkConfig<string>
>('reviewDetailsPage/addCommentForReview', async (content, thunkApi) => {
    const { extra, dispatch, rejectWithValue, getState } = thunkApi;

    const userData = getUserDataSelector(getState());
    const review = getReviewDataSelector(getState());

    if (!userData || !content || !review) {
        return rejectWithValue('no data');
    }

    try {
        const response = await extra.api.post<CommentI>('comment/add', {
            reviewId: review.id,
            userId: userData.id,
            content,
        });

        if (!response.data) {
            throw new Error();
        }

        dispatch(fetchCommentsByReviewIdService(review.id));

        return response.data;
    } catch (e) {
        return rejectWithValue('error');
    }
});
