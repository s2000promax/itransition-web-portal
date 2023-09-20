import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { CommentI } from '@/entities/Comment';

export const updateCommentByIdService = createAsyncThunk<
    void,
    CommentI,
    ThunkConfig<string>
>('comment/addComment', async (comment, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
        await extra.api.patch('comment', comment);
    } catch (e) {
        console.log(e);
        return rejectWithValue('Failed to update comment');
    }
});
