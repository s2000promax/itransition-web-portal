import { createSlice } from '@reduxjs/toolkit';
import { RatingSchemaI } from '../types/rating.interface';
import { rateWorkByUserService } from '../services/rateWorkByUserService';

const initialState: RatingSchemaI = {
    isLoading: false,
    error: undefined,
    data: undefined,
};

const ratingSlice = createSlice({
    name: 'rating',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(rateWorkByUserService.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(rateWorkByUserService.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(rateWorkByUserService.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: ratingActions } = ratingSlice;
export const { reducer: ratingReducer } = ratingSlice;
