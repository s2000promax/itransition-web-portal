import {
    createEntityAdapter,
    createSlice,
    PayloadAction,
} from '@reduxjs/toolkit';
import { StateSchemaI } from '@/app/providers/StoreProvider';
import {
    ReviewI,
    ReviewViewEnums,
    ReviewSortFieldEnums,
} from '@/entities/Review';
import { LocalStorageEnums } from '@/shared/enums/localStorage.enums';
import { SortOrderT } from '@/shared/types/sort.type';

import { ReviewsPageSchemaI } from '@/entities/UI/ReviewsPage';
import { fetchReviewListService } from '@/entities/UI/ReviewsPage/model/services/fetchReviewsList/fetchReviewListService';
import { PersistenceService } from '@/shared/services/persistence.service';
import { WorkTypeEnums } from '@/entities/Work';

const reviewsAdapter = createEntityAdapter<ReviewI>({
    selectId: (review) => review.id,
});

export const getReviews = reviewsAdapter.getSelectors<StateSchemaI>(
    (state) => state.reviewsPage || reviewsAdapter.getInitialState(),
);

const reviewsPageSlice = createSlice({
    name: 'reviewsPage',
    initialState: reviewsAdapter.getInitialState<ReviewsPageSchemaI>({
        isLoading: false,
        error: undefined,
        ids: [],
        entities: {},
        view: ReviewViewEnums.SMALL,
        page: 1,
        hasMore: true,
        _inited: false,
        limit: 9,
        sort: ReviewSortFieldEnums.CREATED,
        search: '',
        order: 'asc',
        type: WorkTypeEnums.ALL,
    }),
    reducers: {
        setView: (state, action: PayloadAction<ReviewViewEnums>) => {
            state.view = action.payload;
            PersistenceService.set(
                LocalStorageEnums.REVIEWS_VIEW,
                action.payload,
            );
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
        setOrder: (state, action: PayloadAction<SortOrderT>) => {
            state.order = action.payload;
        },
        setSort: (state, action: PayloadAction<ReviewSortFieldEnums>) => {
            state.sort = action.payload;
        },
        setType: (state, action: PayloadAction<WorkTypeEnums>) => {
            state.type = action.payload;
        },
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
        },
        initState: (state) => {
            const view = PersistenceService.get(
                LocalStorageEnums.REVIEWS_VIEW,
            ) as ReviewViewEnums;
            state.view = view;
            state.limit = view === ReviewViewEnums.BIG ? 4 : 9;
            state._inited = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchReviewListService.pending, (state, action) => {
                state.error = undefined;
                state.isLoading = true;

                if (action.meta.arg.replace) {
                    reviewsAdapter.removeAll(state);
                }
            })
            .addCase(fetchReviewListService.fulfilled, (state, action) => {
                state.isLoading = false;
                state.hasMore = action.payload.length >= state.limit;

                if (action.meta.arg.replace) {
                    reviewsAdapter.setAll(state, action.payload);
                } else {
                    reviewsAdapter.addMany(state, action.payload);
                }
            })
            .addCase(fetchReviewListService.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { reducer: reviewsPageReducer, actions: reviewsPageActions } =
    reviewsPageSlice;
