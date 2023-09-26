import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoginSchemaI } from '../../types/login.interface';
import { loginByEmail } from '@/entities/Auth/model/services/Login/login.service';

const initialState: LoginSchemaI = {
    isLoading: false,
    email: '',
    password: '',
    error: undefined,
    isFormValid: false,
};

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
            state.isFormValid = true;
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload;
            state.isFormValid = true;
        },
        setFormIsValid: (state, action: PayloadAction<boolean>) => {
            state.isFormValid = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginByEmail.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(loginByEmail.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(loginByEmail.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: loginActions } = loginSlice;
export const { reducer: loginReducer } = loginSlice;
