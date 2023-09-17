import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { CommentI } from '@/entities/Comment';

export const addCommentService = createAsyncThunk<
    void,
    CommentI,
    ThunkConfig<string>
>('comment/addComment', async (comment, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
        await extra.api.post('comment/add', comment);
    } catch (e) {
        console.log(e);
        return rejectWithValue('Failed to add comment');
    }
});
