import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RecommendationReviewsSchemaI } from '@/entities/UI/WorkDetailsPage';
import { fetchRecommendationReviewListService } from '@/entities/UI/WorkDetailsPage/model/services/recommendationReviewList/fetchRecommendationReviewList/fetchRecommendationReviewList.service';
import { ReviewI } from '@/entities/Review';

const initialState: RecommendationReviewsSchemaI = {
    isLoading: false,
    error: undefined,
    data: undefined,
};

const recommendationReviewListSlice = createSlice({
    name: 'recommendationReviewList',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRecommendationReviewListService.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(
                fetchRecommendationReviewListService.fulfilled,
                (state, action: PayloadAction<ReviewI[]>) => {
                    state.isLoading = false;
                    state.data = action.payload;
                },
            )
            .addCase(
                fetchRecommendationReviewListService.rejected,
                (state, action) => {
                    state.isLoading = false;
                    state.error = action.payload;
                },
            );
    },
});

export const { actions: recommendationReviewListActions } =
    recommendationReviewListSlice;
export const { reducer: recommendationReviewListReducer } =
    recommendationReviewListSlice;
