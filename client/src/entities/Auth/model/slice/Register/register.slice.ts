import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RegisterSchemaI } from '../../types/register.interface';
import { register } from '../../services/Register/register.service';

const initialState: RegisterSchemaI = {
    isLoading: false,
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    error: undefined,
    isFormValid: false,
};

const registerSlice = createSlice({
    name: 'register',
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
        setFirstName: (state, action: PayloadAction<string>) => {
            state.firstName = action.payload;
        },
        setLastName: (state, action: PayloadAction<string>) => {
            state.lastName = action.payload;
        },
        setFormIsValid: (state, action: PayloadAction<boolean>) => {
            state.isFormValid = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(register.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: registerActions } = registerSlice;
export const { reducer: registerReducer } = registerSlice;
