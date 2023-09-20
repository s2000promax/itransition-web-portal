import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';

export const fetchTagListService = createAsyncThunk<
    string[],
    void,
    ThunkConfig<string>
>('tag/fetchTagListService', async (_, thunkApi) => {
    const { extra, rejectWithValue, getState, dispatch } = thunkApi;

    try {
        const response = await extra.api.get('tag');

        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue('Failed to fetch tagList');
    }
});
