import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';

import { UserI, UserSchemaI, UserSettingsI } from '../types/user.interface';

import { setUserSettingsMutation } from '../api/user.api';
import { getUserDataSelector } from '../selectors/getUserData/getUserAuthData.selector';
import { AuthSchemaI } from '@/entities/Auth';
import { PersistenceService } from '@/shared/services/persistence.service';
import { LocalStorageEnums } from '@/shared/enums/localStorage.enums';
import { userActions } from '@/entities/User';

type InitUserDataResponseT = UserI | null;

export const initUserData = createAsyncThunk<
    InitUserDataResponseT,
    void,
    ThunkConfig<string>
>('user/initUserData', async (_, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;

    const token = PersistenceService.get(LocalStorageEnums.TOKEN);
    if (token) {
        try {
            const response = await extra.api.get<UserI>('user/me');
            return response.data;
        } catch (e) {
            return rejectWithValue('error');
        }
    } else {
        return null;
    }
    /*
    else {
        dispatch(userActions.setUserData(null));
    }

     */
});

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
