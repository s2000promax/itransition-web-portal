import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    AboutContent,
    AboutContentSchemaI,
} from '../types/aboutContent.interface';
import { fetchAboutContentService } from '../services/fetchAboutContent/fetchAboutContent.service';

const initialState: AboutContentSchemaI = {
    isLoading: false,
    error: undefined,
    content: undefined,
};

const aboutContentSlice = createSlice({
    name: 'aboutContent',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAboutContentService.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(
                fetchAboutContentService.fulfilled,
                (state, action: PayloadAction<AboutContent>) => {
                    state.isLoading = false;
                    state.content = action.payload;
                },
            )
            .addCase(fetchAboutContentService.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: aboutContentActions } = aboutContentSlice;
export const { reducer: aboutContentReducer } = aboutContentSlice;
