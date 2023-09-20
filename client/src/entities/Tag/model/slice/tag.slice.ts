import { createSlice } from '@reduxjs/toolkit';
import { TagSchemaI } from '../types/tag.interface';
import { fetchTagListService } from '../services/fetchTagList.service';

const initialState: TagSchemaI = {
    isLoading: false,
    error: undefined,
    data: [],
    tagList: undefined,
    formData: undefined,
};

const tagSlice = createSlice({
    name: 'tag',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTagListService.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchTagListService.fulfilled, (state, action) => {
                state.isLoading = false;
                state.tagList = action.payload;
            })
            .addCase(fetchTagListService.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: tagActions } = tagSlice;
export const { reducer: tagReducer } = tagSlice;
