import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { WorkI } from '../../types/work.interface';

export const fetchWorkListDataService = createAsyncThunk<
    WorkI[],
    void,
    ThunkConfig<string>
>('work/fetchWorkListData', async (_, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.get<WorkI[]>('work/workList');

        if (response.status !== 200) {
            return rejectWithValue('error');
        }
        console.log(response.data);
        return response.data;
    } catch (e) {
        return rejectWithValue('error');
    }
});
