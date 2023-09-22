import { UserI } from '@/entities/User';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { RegisterSchemaI } from '@/entities/Auth';
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
        await extra.api.post<RegisterSchemaI>('auth/register', registerData);
    } catch (e) {
        return rejectWithValue('error');
    }
});
