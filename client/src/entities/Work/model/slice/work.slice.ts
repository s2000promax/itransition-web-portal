import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WorkI, WorkSchemaI } from '../types/work.interface';
import { fetchWorkDataService } from '../services/fetchWorkData/fetchWorkData.service';
import { updateWorkDataService } from '../services/updateWorkData/updateWorkData.service';

const initialState: WorkSchemaI = {
    readonly: true,
    isLoading: false,
    error: undefined,
    data: undefined,
};

const workSlice = createSlice({
    name: 'work',
    initialState,
    reducers: {
        setReadonly: (state, action: PayloadAction<boolean>) => {
            state.readonly = action.payload;
        },
        cancelEdit: (state) => {
            state.readonly = true;
            state.validateErrors = undefined;
            state.form = state.data;
        },
        updateWork: (state, action: PayloadAction<WorkI>) => {
            state.form = {
                ...state.form,
                ...action.payload,
            };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchWorkDataService.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(
                fetchWorkDataService.fulfilled,
                (state, action: PayloadAction<WorkI>) => {
                    state.isLoading = false;
                    state.data = action.payload;
                    state.form = action.payload;
                },
            )
            .addCase(fetchWorkDataService.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(updateWorkDataService.pending, (state) => {
                state.validateErrors = undefined;
                state.isLoading = true;
            })
            .addCase(
                updateWorkDataService.fulfilled,
                (state, action: PayloadAction<WorkI>) => {
                    state.isLoading = false;
                    state.data = action.payload;
                    state.form = action.payload;
                    state.readonly = true;
                    state.validateErrors = undefined;
                },
            )
            .addCase(updateWorkDataService.rejected, (state, action) => {
                state.isLoading = false;
                state.validateErrors = action.payload;
            });
    },
});

export const { actions: workActions } = workSlice;
export const { reducer: workReducer } = workSlice;
