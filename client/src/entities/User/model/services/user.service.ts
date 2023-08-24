import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { getUserDataByIdQuery } from '../api/user.api';
import { UserI, UserSettingsI } from '../types/user.interface';
import { LocalStorageEnums } from '@/shared/enums/localStorage.enums';
import { PersistenceService } from '@/shared/services/persistence.service';
import { getUserAuthData } from '../selectors/getUserAuthData.selector';
import { getUserSettings } from '../selectors/getUserSettings.selector';
import { setUserSettingsMutation } from '../api/user.api';

export const initAuthData = createAsyncThunk<UserI, void, ThunkConfig<string>>(
    'user/initAuthData',
    async (newJsonSettings, thunkApi) => {
        const { rejectWithValue, dispatch } = thunkApi;

        const userId = PersistenceService.get(LocalStorageEnums.USER) as string;

        if (!userId) {
            return rejectWithValue('');
        }

        try {
            const response = await dispatch(
                getUserDataByIdQuery(userId),
            ).unwrap();

            return response;
        } catch (e) {
            console.log(e);
            return rejectWithValue('');
        }
    },
);

export const saveUserSettings = createAsyncThunk<
    UserSettingsI,
    UserSettingsI,
    ThunkConfig<string>
>('user/saveJsonSettings', async (newUserSettings, thunkApi) => {
    const { rejectWithValue, getState, dispatch } = thunkApi;
    const userData = getUserAuthData(getState());
    const currentSettings = getUserSettings(getState());

    if (!userData) {
        return rejectWithValue('');
    }

    try {
        const response = await dispatch(
            setUserSettingsMutation({
                userId: userData.id,
                userSettings: {
                    ...currentSettings,
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
