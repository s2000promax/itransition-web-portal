import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UISchemaI } from '../types/ui.interface';
import { LanguageEnums } from '@/shared/enums/language.enums';
import { languageChangeService } from '../services/languageChange/languageChange.service';
import { ThemeEnums } from '@/shared/enums/theme.enums';
import { colorThemeChangeService } from '../services/colorThemeChange/colorThemeChange.service';

const initialState: UISchemaI = {
    scroll: {},
    language: LanguageEnums.ENG,
    theme: ThemeEnums.LIGHT,
    tags: '',
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setScrollPosition: (
            state,
            { payload }: PayloadAction<{ path: string; position: number }>,
        ) => {
            state.scroll[payload.path] = payload.position;
        },
        setTagsSearch: (state, action: PayloadAction<string>) => {
            state.tags = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(languageChangeService.fulfilled, (state, action) => {
                state.language = action.payload;
            })
            .addCase(colorThemeChangeService.fulfilled, (state, action) => {
                state.theme = action.payload;
            });
    },
});

export const { actions: uiActions } = uiSlice;
export const { reducer: uiReducer } = uiSlice;
