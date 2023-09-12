import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserSchemaI, UserI, UserSettingsI } from '../types/user.interface';
import { initUserData, saveUserSettings } from '../services/user.service';

const initialState: UserSchemaI = {
    userData: null,
    _inited: false,
    isLoading: false,
    error: undefined,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        removeUserData: (state) => {
            state.userData = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(initUserData.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(initUserData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.userData = action.payload;
                state._inited = true;
            })
            .addCase(initUserData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                state._inited = true;
            })
            .addCase(
                saveUserSettings.fulfilled,
                (state, { payload }: PayloadAction<UserSettingsI>) => {
                    if (state.userData) {
                        state.userData.userSettings = payload;
                    }
                },
            );
    },
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
