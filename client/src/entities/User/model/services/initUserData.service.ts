import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';

import { UserI } from '../types/user.interface';
import { PersistenceService } from '@/shared/services/persistence.service';
import { LocalStorageEnums } from '@/shared/enums/localStorage.enums';
import {
    colorThemeChangeService,
    languageChangeService,
    uiActions,
} from '@/entities/UI/UI';

type InitUserDataResponseT = UserI | undefined;

export const initUserDataService = createAsyncThunk<
    UserI,
    void,
    ThunkConfig<string>
>('user/initUserData', async (_, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;

    const token = PersistenceService.get(LocalStorageEnums.TOKEN);
    if (token) {
        try {
            const response = await extra.api.get<UserI>('user/me');

            if (response.data?.settings?.language) {
                dispatch(
                    languageChangeService(response.data.settings.language),
                );
            }

            if (response.data?.settings?.theme) {
                dispatch(colorThemeChangeService(response.data.settings.theme));
            }

            return response.data;
        } catch (e) {
            return rejectWithValue('error');
        }
    } else {
        return rejectWithValue('error');
    }
});
