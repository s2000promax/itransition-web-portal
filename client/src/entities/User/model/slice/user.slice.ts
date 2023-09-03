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
            state.userData = payload;

            // PersistenceService.set(LocalStorageEnums.TOKEN, payload.id);
        },
        logout: (state) => {
            state.userData = undefined;

            PersistenceService.removeKey(LocalStorageEnums.TOKEN);
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
        builder.addCase(
            initAuthData.fulfilled,
            (state, { payload }: PayloadAction<UserI>) => {
                state.userData = payload;
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
