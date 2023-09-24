import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FeedbackSchemaI } from '@/entities/UI/WorkDetailsPage';
import { fetchFeedbackListService } from '@/entities/UI/WorkDetailsPage/model/services/feedbackList/fetchFeedbackList/fetchFeedbackList.service';
import { FeedbackI } from '@/entities/FeedBack';

const initialState: FeedbackSchemaI = {
    isLoading: false,
    error: undefined,
    data: undefined,
};

const feedbackListSlice = createSlice({
    name: 'feedbackList',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchFeedbackListService.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(
                fetchFeedbackListService.fulfilled,
                (state, action: PayloadAction<FeedbackI[]>) => {
                    state.isLoading = false;
                    state.data = action.payload;
                },
            )
            .addCase(fetchFeedbackListService.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: feedbackListActions } = feedbackListSlice;
export const { reducer: feedbackListReducer } = feedbackListSlice;
