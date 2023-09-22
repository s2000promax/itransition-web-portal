import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';

type BodyT = {
    reviewId: string;
};
export const updateReviewViewCounterService = createAsyncThunk<
    void,
    BodyT,
    ThunkConfig<string>
>('review/updateReviewViewCounter', async (body, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
        await extra.api.post('review/counter', body);
    } catch (e) {
        console.log(e);
        return rejectWithValue('Failed to update review counter');
    }
});
