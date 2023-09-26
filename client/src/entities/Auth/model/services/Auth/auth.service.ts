import { createAsyncThunk } from '@reduxjs/toolkit';
import { userActions } from '@/entities/User';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { PersistenceService } from '@/shared/services/persistence.service';
import { LocalStorageEnums } from '@/shared/enums/localStorage.enums';

/*
export const initAuthData = createAsyncThunk<AuthSchemaI, void, ThunkConfig<string>>(
    'auth/initAuthData',
    async (_, thunkApi) => {
        const { extra, dispatch, rejectWithValue } = thunkApi;

        const token = PersistenceService.get(LocalStorageEnums.TOKEN);

        try {
            if (token) {
                const response = await extra.api.get<UserI>('user/me');
                dispatch(userActions.setUserData(response.data));
            } else {
                dispatch(userActions.setUserData(null));
            }
        } catch (e) {
            return rejectWithValue('error');
        }
    },
);
*/

export const removeAuthData = createAsyncThunk<void, void, ThunkConfig<string>>(
    'auth/removeAuthData',
    async (_, thunkApi) => {
        const { extra, rejectWithValue, dispatch } = thunkApi;

        PersistenceService.removeKey(LocalStorageEnums.TOKEN);

        try {
            const response = await extra.api.get<string>('auth/logout');

            dispatch(userActions.removeUserData());
        } catch (e) {
            return rejectWithValue('error');
        }
    },
);
