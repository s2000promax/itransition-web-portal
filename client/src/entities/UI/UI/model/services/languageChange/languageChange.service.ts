import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { LanguageEnums } from '@/shared/enums/language.enums';
import i18n from 'i18next';

export const languageChangeService = createAsyncThunk<
    LanguageEnums,
    LanguageEnums,
    ThunkConfig<string>
>('ui/languageChange', async (arg, thunkApi) => {
    const { extra, dispatch, rejectWithValue, getState } = thunkApi;
    try {
        await i18n.changeLanguage(arg);

        return arg;
    } catch (e) {
        return rejectWithValue('Error to change language');
    }
});
