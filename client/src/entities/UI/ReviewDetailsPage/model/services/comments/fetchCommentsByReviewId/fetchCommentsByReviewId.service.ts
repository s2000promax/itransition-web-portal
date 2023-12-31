import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { CommentI } from '@/entities/Comment';

export const fetchCommentsByReviewIdService = createAsyncThunk<
    CommentI[],
    string | undefined,
    ThunkConfig<string>
>('reviewDetailsPage/fetchCommentsByReviewId', async (reviewId, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    if (!reviewId) {
        return rejectWithValue('error');
    }

    try {
        const response = await extra.api.get<CommentI[]>(
            'comment/commentList',
            {
                params: {
                    _reviewId: reviewId,
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
