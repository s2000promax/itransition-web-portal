import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ReviewSchemaI, ReviewI } from '../types/review.interface';
import { fetchReviewByIdService } from '../services/fetchReviewById/fetchReviewById.service';

const initialState: ReviewSchemaI = {
    isLoading: false,
    error: undefined,
    data: undefined,
};

const reviewSlice = createSlice({
    name: 'review',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchReviewByIdService.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(
                fetchReviewByIdService.fulfilled,
                (state, action: PayloadAction<ReviewI>) => {
                    state.isLoading = false;
                    state.data = action.payload;
                },
            )
            .addCase(fetchReviewByIdService.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: reviewActions } = reviewSlice;
export const { reducer: reviewReducer } = reviewSlice;
