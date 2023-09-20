import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { CommentI } from '@/entities/Comment';

export const fetchCommentListService = createAsyncThunk<
    CommentI[],
    string,
    ThunkConfig<string>
>('comment/fetchCommentList', async (reviewId, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.get('comment', {
            params: {
                _reviewId: reviewId,
            },
        });

        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue('Failed to fetch comment list');
    }
});
