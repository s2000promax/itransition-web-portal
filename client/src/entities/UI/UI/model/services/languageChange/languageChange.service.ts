import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { LanguageEnums } from '@/shared/enums/language.enums';
import i18n from 'i18next';
import { saveUserSettingsService, userActions } from '@/entities/User';
import { PersistenceService } from '@/shared/services/persistence.service';
import { LocalStorageEnums } from '@/shared/enums/localStorage.enums';

export const languageChangeService = createAsyncThunk<
    LanguageEnums,
    LanguageEnums,
    ThunkConfig<string>
>('ui/languageChange', async (newLanguage, thunkApi) => {
    const { extra, dispatch, rejectWithValue, getState } = thunkApi;
    try {
        await i18n.changeLanguage(newLanguage);
        dispatch(userActions.updateUserSettings({ language: newLanguage }));
        dispatch(saveUserSettingsService());
        PersistenceService.set(LocalStorageEnums.LANGUAGE, newLanguage);

        return newLanguage;
    } catch (e) {
        return rejectWithValue('Error to change language');
    }
});
