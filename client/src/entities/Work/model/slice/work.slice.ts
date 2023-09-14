import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WorkI, WorkSchemaI } from '../types/work.interface';
import { fetchWorkListDataService } from '@/entities/Work/model/services/fetchWorkListData/fetchWorkListData.service';
import { updateWorkDataService } from '../services/updateWorkData/updateWorkData.service';
import { fetchWorkDataService } from '@/entities/Work/model/services/fetchWorkData/fetchWorkData.service';

const initialState: WorkSchemaI = {
    readonly: true,
    isLoading: false,
    error: undefined,
    data: undefined,
    entities: undefined,
};

const workSlice = createSlice({
    name: 'work',
    initialState,
    reducers: {
        setReadonly: (state, action: PayloadAction<boolean>) => {
            state.readonly = action.payload;
            state.form = state.data;
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
            })

            .addCase(fetchWorkListDataService.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(
                fetchWorkListDataService.fulfilled,
                (state, action: PayloadAction<WorkI[]>) => {
                    state.isLoading = false;
                    state.entities = action.payload;
                },
            )
            .addCase(fetchWorkListDataService.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: workActions } = workSlice;
export const { reducer: workReducer } = workSlice;
