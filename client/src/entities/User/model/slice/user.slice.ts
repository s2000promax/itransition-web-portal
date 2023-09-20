import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserSchemaI, UserSettingsI } from '../types/user.interface';
import { initUserDataService } from '../services/initUserData.service';

const initialState: UserSchemaI = {
    userData: undefined,
    _inited: false,
    isLoading: false,
    error: undefined,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        removeUserData: (state) => {
            state.userData = undefined;
        },
        updateExtendUserData: (state, action: PayloadAction<string>) => {
            state.extendData = action.payload;
        },
        updateUserSettings: (state, action: PayloadAction<UserSettingsI>) => {
            if (state.userData) {
                state.userData.settings = {
                    ...state.userData.settings,
                    ...action.payload,
                };
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(initUserDataService.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(initUserDataService.fulfilled, (state, action) => {
                state.isLoading = false;
                state.userData = action.payload;
                state._inited = true;
            })
            .addCase(initUserDataService.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                state._inited = true;
            });
    },
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
