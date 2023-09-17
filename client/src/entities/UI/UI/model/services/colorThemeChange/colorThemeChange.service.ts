import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { ThemeEnums } from '@/shared/enums/theme.enums';
import { saveUserSettingsService, userActions } from '@/entities/User';
import { PersistenceService } from '@/shared/services/persistence.service';
import { LocalStorageEnums } from '@/shared/enums/localStorage.enums';

export const colorThemeChangeService = createAsyncThunk<
    ThemeEnums,
    ThemeEnums,
    ThunkConfig<string>
>('ui/colorThemeChange', async (newTheme, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;
    try {
        dispatch(userActions.updateUserSettings({ theme: newTheme }));
        dispatch(saveUserSettingsService());
        PersistenceService.set(LocalStorageEnums.THEME, newTheme);

        return newTheme;
    } catch (e) {
        return rejectWithValue('Error to change color theme');
    }
});
