import { createAsyncThunk } from '@reduxjs/toolkit';
import { userActions, UserI } from '@/entities/User';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { authActions, AuthSchemaI, initAuthData } from '@/entities/Auth';
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

        PersistenceService.set(
            LocalStorageEnums.TOKEN,
            response.data.accessToken,
        );

        dispatch(authActions.setAuthData(response.data));

        dispatch(initAuthData());

        return response.data;
    } catch (e) {
        return rejectWithValue('error');
    }
});
