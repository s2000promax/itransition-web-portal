import { rtkApi } from '@/shared/api/rtk.api';
import { UserI } from '@/entities/User';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
    authActions,
    AuthSchemaI,
    registerActions,
    RegisterSchemaI,
} from '@/entities/Auth';
import { ThunkConfig } from '@/app/providers/StoreProvider';

type RegisterProps = Pick<
    UserI,
    'email' | 'firstName' | 'lastName' | 'password'
>;

export const register = createAsyncThunk<
    void,
    RegisterProps,
    ThunkConfig<string>
>('register', async (registerData, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.post<RegisterSchemaI>(
            'auth/register',
            registerData,
        );
        console.log('R', response);
        if (response.status !== 200) {
            return rejectWithValue('error');
        }
    } catch (e) {
        return rejectWithValue('error');
    }
});
