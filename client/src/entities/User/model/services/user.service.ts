import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';

import { UserSettingsI } from '../types/user.interface';

import { setUserSettingsMutation } from '../api/user.api';
import { getUserDataSelector } from '../selectors/getUserData/getUserAuthData.selector';

export const saveUserSettings = createAsyncThunk<
    UserSettingsI,
    UserSettingsI,
    ThunkConfig<string>
>('user/saveUserSettings', async (newUserSettings, thunkApi) => {
    const { rejectWithValue, getState, dispatch } = thunkApi;
    const userData = getUserDataSelector(getState());

    if (!userData) {
        return rejectWithValue('');
    }

    try {
        const response = await dispatch(
            setUserSettingsMutation({
                userId: userData.id,
                userSettings: {
                    // ...currentSettings,
                    ...newUserSettings,
                },
            }),
        ).unwrap();

        if (!response.userSettings) {
            return rejectWithValue('');
        }

        return response.userSettings;
    } catch (e) {
        console.log(e);
        return rejectWithValue('');
    }
});
