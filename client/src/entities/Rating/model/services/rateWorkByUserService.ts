import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { RatingI } from '@/entities/Rating';

export const rateWorkByUserService = createAsyncThunk<
    void,
    RatingI,
    ThunkConfig<string>
>('rating/rateWorkByUser', async (rate, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
        await extra.api.post('rate/work', rate);
    } catch (e) {
        console.log(e);
        return rejectWithValue('Failed to rate work');
    }
});
