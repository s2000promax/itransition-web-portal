import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { getUserDataSelector } from '../selectors/getUserData/getUserAuthData.selector';
import { getUserSettings } from '@/entities/User';

export const saveUserSettingsService = createAsyncThunk<
    void,
    void,
    ThunkConfig<string>
>('user/saveUserSettings', async (_, thunkApi) => {
    const { extra, rejectWithValue, getState, dispatch } = thunkApi;
    const userData = getUserDataSelector(getState());

    if (!userData) {
        return rejectWithValue('no userData');
    }
    const body = getUserSettings(getState());

    try {
        await extra.api.patch(`user/${userData.id}`, body);
    } catch (e) {
        console.log(e);
        return rejectWithValue('Failed to update user settings');
    }
});
