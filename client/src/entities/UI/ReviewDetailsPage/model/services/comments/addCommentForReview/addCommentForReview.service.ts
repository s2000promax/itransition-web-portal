import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUserAuthData } from '@/entities/User';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { CommentI } from '@/entities/Comment';
import { getReviewDataSelector } from '@/entities/Review';
import { fetchCommentsByReviewIdService } from '../fetchCommentsByReviewId/fetchCommentsByReviewId.service';

export const addCommentForReviewService = createAsyncThunk<
    CommentI,
    string,
    ThunkConfig<string>
>('articleDetails/addCommentForArticle', async (text, thunkApi) => {
    const { extra, dispatch, rejectWithValue, getState } = thunkApi;

    const userData = getUserAuthData(getState());
    const review = getReviewDataSelector(getState());

    if (!userData || !text || !review) {
        return rejectWithValue('no data');
    }

    try {
        const response = await extra.api.post<CommentI>('/comments', {
            articleId: review.id,
            userId: userData.id,
            text,
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
