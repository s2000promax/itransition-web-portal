import { AuthSchemaI } from '@/entities/Auth/model/types/auth.interface';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: AuthSchemaI = {
    accessToken: '',
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthData: (state, { payload }: PayloadAction<AuthSchemaI>) => {
            state.accessToken = payload.accessToken;
        },
        clearAuthData: (state) => {
            state.accessToken = '';
        },
    },
});

export const { actions: authActions } = authSlice;

export const { reducer: authReducer } = authSlice;
