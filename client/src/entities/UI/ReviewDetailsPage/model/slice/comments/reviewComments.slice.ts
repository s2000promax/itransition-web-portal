import {
    createEntityAdapter,
    createSlice,
    PayloadAction,
} from '@reduxjs/toolkit';
import { CommentI } from '@/entities/Comment';
import { StateSchemaI } from '@/app/providers/StoreProvider';

import { CommentsSchemaI } from '../../types/reviewDetailsPage.interface';
import { fetchCommentsByReviewIdService } from '../../services/comments/fetchCommentsByReviewId/fetchCommentsByReviewId.service';

const commentsAdapter = createEntityAdapter<CommentI>({
    selectId: (comment) => comment.id,
});

export const getReviewComments = commentsAdapter.getSelectors<StateSchemaI>(
    (state) =>
        state.reviewDetailsPage?.comments || commentsAdapter.getInitialState(),
);

const reviewCommentsSlice = createSlice({
    name: 'reviewComments',
    initialState: commentsAdapter.getInitialState<CommentsSchemaI>({
        isLoading: false,
        error: undefined,
        ids: [],
        entities: {},
    }),
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCommentsByReviewIdService.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(
                fetchCommentsByReviewIdService.fulfilled,
                (state, action: PayloadAction<CommentI[]>) => {
                    state.isLoading = false;
                    commentsAdapter.setAll(state, action.payload);
                },
            )
            .addCase(
                fetchCommentsByReviewIdService.rejected,
                (state, action) => {
                    state.isLoading = false;
                    state.error = action.payload;
                },
            );
    },
});

export const { reducer: reviewCommentsReducer } = reviewCommentsSlice;
