import { createSlice } from '@reduxjs/toolkit';
import { LikeSchemaI } from '../types/like.interface';
import { likeUserByReviewService } from '../services/likeUserByReview.service';

const initialState: LikeSchemaI = {
    isLoading: false,
    error: undefined,
    data: undefined,
};

const likeSlice = createSlice({
    name: 'like',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(likeUserByReviewService.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(likeUserByReviewService.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(likeUserByReviewService.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: likeActions } = likeSlice;
export const { reducer: likeReducer } = likeSlice;
