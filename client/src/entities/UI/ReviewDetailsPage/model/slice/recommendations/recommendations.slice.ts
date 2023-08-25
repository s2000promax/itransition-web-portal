import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { StateSchemaI } from '@/app/providers/StoreProvider';
import { ReviewI } from '@/entities/Review';
import { RecommendationsReviewsSchemaI } from '../../types/reviewDetailsPage.interface';
import { fetchRecommendationsService } from '@/entities/UI/ReviewDetailsPage/model/services/recommendations/fetchRecommendations/fetchRecommendations.service';

const recommendationsAdapter = createEntityAdapter<ReviewI>({
    selectId: (article) => article.id,
});

export const getArticleRecommendations =
    recommendationsAdapter.getSelectors<StateSchemaI>(
        (state) =>
            state.reviewDetailsPage?.recommendations ||
            recommendationsAdapter.getInitialState(),
    );

const recommendationsSlice = createSlice({
    name: 'recommendations',
    initialState:
        recommendationsAdapter.getInitialState<RecommendationsReviewsSchemaI>({
            isLoading: false,
            error: undefined,
            ids: [],
            entities: {},
        }),
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRecommendationsService.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchRecommendationsService.fulfilled, (state, action) => {
                state.isLoading = false;
                recommendationsAdapter.setAll(state, action.payload);
            })
            .addCase(fetchRecommendationsService.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { reducer: recommendationsReducer } = recommendationsSlice;
