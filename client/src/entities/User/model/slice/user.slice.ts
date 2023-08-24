import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { UserSchemaI, UserI, UserSettingsI } from '../types/user.interface';

import { initAuthData, saveUserSettings } from '../services/user.service';
import { PersistenceService } from '@/shared/services/persistence.service';
import { LocalStorageEnums } from '@/shared/enums/localStorage.enums';

const initialState: UserSchemaI = {
    _inited: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAuthData: (state, { payload }: PayloadAction<UserI>) => {
            state.authData = payload;

            PersistenceService.set(LocalStorageEnums.USER, payload.id);
        },
        logout: (state) => {
            state.authData = undefined;

            PersistenceService.removeKey(LocalStorageEnums.USER);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(
            saveUserSettings.fulfilled,
            (state, { payload }: PayloadAction<UserSettingsI>) => {
                if (state.authData) {
                    state.authData.userSettings = payload;
                }
            },
        );
        builder.addCase(
            initAuthData.fulfilled,
            (state, { payload }: PayloadAction<UserI>) => {
                state.authData = payload;
                state._inited = true;
            },
        );
        builder.addCase(initAuthData.rejected, (state) => {
            state._inited = true;
        });
    },
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
