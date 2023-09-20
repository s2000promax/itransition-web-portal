import {
    createEntityAdapter,
    createSlice,
    PayloadAction,
} from '@reduxjs/toolkit';
import { StateSchemaI } from '@/app/providers/StoreProvider';
import { WorkI, WorkTypeEnums } from '@/entities/Work';
import { ViewEnums } from '@/entities/UI/UI';
import { SortOrderT } from '@/shared/types/sort.type';
import { LocalStorageEnums } from '@/shared/enums/localStorage.enums';
import { WorkListPageSchemaI } from '../types/workListPage.interface';
import { fetchWorkListPageService } from '../services/fetchWorkListPage/fetchWorkListPageService';
import { PersistenceService } from '@/shared/services/persistence.service';
import { WorkSortFieldEnums } from '../enums/WorkSortField.enums';

const workListAdapter = createEntityAdapter<WorkI>({
    selectId: (work) => work.id!,
});

export const getWorkListPage = workListAdapter.getSelectors<StateSchemaI>(
    (state) => state.workListPage || workListAdapter.getInitialState(),
);

const workListPageSlice = createSlice({
    name: 'workListPage',
    initialState: workListAdapter.getInitialState<WorkListPageSchemaI>({
        isLoading: false,
        error: undefined,
        ids: [],
        entities: {},
        view: ViewEnums.SMALL,
        page: 1,
        hasMore: true,
        _inited: false,
        limit: 9,
        sort: WorkSortFieldEnums.RELEASE_DATE,
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
        setSort: (state, action: PayloadAction<WorkSortFieldEnums>) => {
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
            ) as ViewEnums;
            state.view = view;
            state.limit = view === ViewEnums.BIG ? 4 : 9;
            state._inited = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchWorkListPageService.pending, (state, action) => {
                state.error = undefined;
                state.isLoading = true;

                if (action.meta.arg.replace) {
                    workListAdapter.removeAll(state);
                }
            })
            .addCase(fetchWorkListPageService.fulfilled, (state, action) => {
                state.isLoading = false;
                state.hasMore = action.payload.length >= state.limit;

                if (action.meta.arg.replace) {
                    workListAdapter.setAll(state, action.payload);
                } else {
                    workListAdapter.addMany(state, action.payload);
                }
            })
            .addCase(fetchWorkListPageService.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { reducer: workListPageReducer, actions: workListPageActions } =
    workListPageSlice;
