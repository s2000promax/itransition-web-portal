import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { ThemeEnums } from '@/shared/enums/theme.enums';

export const colorThemeChangeService = createAsyncThunk<
    ThemeEnums,
    ThemeEnums,
    ThunkConfig<string>
>('ui/colorThemeChange', async (newTheme, thunkApi) => {
    const { extra, dispatch, rejectWithValue, getState } = thunkApi;
    try {
        return newTheme;
    } catch (e) {
        return rejectWithValue('Error to change color theme');
    }
});
