import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { WorkI } from '../../types/work.interface';

export const fetchWorkDataService = createAsyncThunk<
    WorkI,
    string,
    ThunkConfig<string>
>('work/fetchWorkData', async (workId, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.get<WorkI>(`work/${workId}`);

        if (response.status !== 200) {
            return rejectWithValue('error');
        }

        return response.data;
    } catch (e) {
        return rejectWithValue('error');
    }
});
