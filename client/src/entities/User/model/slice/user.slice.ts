import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserSchemaI, UserI, UserSettingsI } from '../types/user.interface';
import { saveUserSettings } from '../services/user.service';

const initialState: UserSchemaI = {
    userData: null,
    _inited: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserData: (state, { payload }: PayloadAction<UserI | null>) => {
            console.log(payload);
            state.userData = payload;
            state._inited = true;
        },
        removeUserData: (state) => {
            state.userData = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(
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
