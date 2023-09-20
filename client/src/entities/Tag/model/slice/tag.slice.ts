import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TagSchemaI } from '../types/tag.interface';
import { fetchTagListService } from '../services/fetchTagList.service';

const initialState: TagSchemaI = {
    isLoading: false,
    error: undefined,
    data: [],
    formData: undefined,
};

const tagSlice = createSlice({
    name: 'tag',
    initialState,
    reducers: {
        updateTagFormData: (state, action) => {
            state.formData = action.payload;
        },
        addTag: (state, action) => {
            if (action.payload && !state.data?.includes(action.payload)) {
                state.data?.push(action.payload);
            }
        },
        deleteTag: (state, action: PayloadAction<string>) => {
            if (state?.data?.length && action.payload) {
                state.data = state.data.filter((tag) => tag !== action.payload);
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTagListService.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchTagListService.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchTagListService.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: tagActions } = tagSlice;
export const { reducer: tagReducer } = tagSlice;
