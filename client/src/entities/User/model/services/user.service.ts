import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';

import { UserI, UserSettingsI } from '../types/user.interface';
import { LocalStorageEnums } from '@/shared/enums/localStorage.enums';
import { PersistenceService } from '@/shared/services/persistence.service';

import { setUserSettingsMutation } from '../api/user.api';
import { getAuthDataSelector, RegisterSchemaI } from '@/entities/Auth';
import { getUserDataSelector, getUserSettings } from '@/entities/User';

export const saveUserSettings = createAsyncThunk<
    UserSettingsI,
    UserSettingsI,
    ThunkConfig<string>
>('user/saveJsonSettings', async (newUserSettings, thunkApi) => {
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
