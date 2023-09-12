import { AuthSchemaI } from '@/entities/Auth/model/types/auth.interface';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { removeAuthData } from '@/entities/Auth/model/services/auth.service';
import { UserI } from '@/entities/User';

const initialState: AuthSchemaI = {
    accessToken: null,
    isLoading: false,
    error: undefined,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthData: (state, { payload }: PayloadAction<AuthSchemaI>) => {
            state.accessToken = payload.accessToken;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(removeAuthData.fulfilled, (state) => {
            state.accessToken = null;
        });
    },
});

export const { actions: authActions } = authSlice;

export const { reducer: authReducer } = authSlice;
