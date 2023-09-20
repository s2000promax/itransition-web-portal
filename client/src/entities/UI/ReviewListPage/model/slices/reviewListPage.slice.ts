import {
    createEntityAdapter,
    createSlice,
    PayloadAction,
} from '@reduxjs/toolkit';
import { StateSchemaI } from '@/app/providers/StoreProvider';
import { WorkTypeEnums } from '@/entities/Work';
import { ReviewI } from '@/entities/Review';
import { ViewEnums } from '@/entities/UI/UI';
import { SortOrderT } from '@/shared/types/sort.type';
import { LocalStorageEnums } from '@/shared/enums/localStorage.enums';
import { ReviewListPageSchemaI } from '../types/reviewListPage.interface';
import { fetchReviewListService } from '../services/fetchReviewList/fetchReviewListService';
import { PersistenceService } from '@/shared/services/persistence.service';
import { ReviewSortFieldEnums } from '../enums/ReviewSortField.enums';

const reviewListAdapter = createEntityAdapter<ReviewI>({
    selectId: (review) => review.id,
});

export const getReviewList = reviewListAdapter.getSelectors<StateSchemaI>(
    (state) => state.reviewListPage || reviewListAdapter.getInitialState(),
);

const reviewListPageSlice = createSlice({
    name: 'reviewListPage',
    initialState: reviewListAdapter.getInitialState<ReviewListPageSchemaI>({
        isLoading: false,
        error: undefined,
        ids: [],
        entities: {},
        view: ViewEnums.SMALL,
        page: 1,
        hasMore: true,
        _inited: false,
        limit: 9,
        sort: ReviewSortFieldEnums.CREATED_AT,
        search: '',
        order: 'asc',
        type: WorkTypeEnums.ALL,
        tags: '',
    }),
    reducers: {
        setView: (state, action: PayloadAction<ViewEnums>) => {
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
        setTagsSearch: (state, action: PayloadAction<string>) => {
            state.tags = action.payload;
        },
        initState: (state) => {
            const view = PersistenceService.get(
                LocalStorageEnums.REVIEWS_VIEW,
            ) as ViewEnums;
            state.view = view;
            state.limit = view === ViewEnums.BIG ? 4 : 9;
            state._inited = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchReviewListService.pending, (state, action) => {
                state.error = undefined;
                state.isLoading = true;

                if (action.meta.arg.replace) {
                    reviewListAdapter.removeAll(state);
                }
            })
            .addCase(fetchReviewListService.fulfilled, (state, action) => {
                state.isLoading = false;
                state.hasMore = action.payload.length >= state.limit;

                if (action.meta.arg.replace) {
                    reviewListAdapter.setAll(state, action.payload);
                } else {
                    reviewListAdapter.addMany(state, action.payload);
                }
            })
            .addCase(fetchReviewListService.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const {
    reducer: reviewListPageReducer,
    actions: reviewListPageActions,
} = reviewListPageSlice;
