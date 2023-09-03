import { createAsyncThunk } from '@reduxjs/toolkit';
import { initAuthData, UserI } from '@/entities/User';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { authActions, AuthSchemaI } from '@/entities/Auth';
import { PersistenceService } from '@/shared/services/persistence.service';
import { LocalStorageEnums } from '@/shared/enums/localStorage.enums';

type LoginByEmailProps = Pick<UserI, 'email' | 'password'>;

export const loginByEmail = createAsyncThunk<
    AuthSchemaI,
    LoginByEmailProps,
    ThunkConfig<string>
>('login/loginByEmail', async (authData, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.post<AuthSchemaI>(
            'auth/login',
            authData,
        );

        if (response.status !== 201) {
            return rejectWithValue('error');
        }

        dispatch(authActions.setAuthData(response.data));
        PersistenceService.set(
            LocalStorageEnums.TOKEN,
            response.data.accessToken,
        );
        return response.data;
    } catch (e) {
        return rejectWithValue('error');
    }
});
