import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { WorkI } from '../../types/work.interface';
import { userActions } from '@/entities/User';

export const fetchWorkByIdService = createAsyncThunk<
    WorkI,
    string,
    ThunkConfig<string>
>('work/fetchWorkById', async (workId, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.get<WorkI>(`work/${workId}`);

        if (response.status !== 200) {
            return rejectWithValue('error');
        }

        if (response.data?.id) {
            dispatch(userActions.updateExtendUserData(response.data.id));
        }

        return response.data;
    } catch (e) {
        return rejectWithValue('error');
    }
});
