import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { UserI } from '@/entities/User';

export const fetchUserListService = createAsyncThunk<
    UserI[],
    void,
    ThunkConfig<string>
>('dashboard/fetchUserList', async (_, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.get<UserI[]>('admin/getAllUsers');

        if (response.status !== 200) {
            return rejectWithValue('error');
        }

        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue('error');
    }
});
