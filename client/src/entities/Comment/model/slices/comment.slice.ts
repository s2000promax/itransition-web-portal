import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CommentSchemaI } from '@/entities/Comment';
import { addCommentService } from '@/entities/Comment/model/services/addComment/addComment.service';
import { fetchCommentListService } from '@/entities/Comment/model/services/fetchCommentList/fetchCommentList.service';

const initialState: CommentSchemaI = {
    isLoading: false,
    error: undefined,
    data: undefined,
};

const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addCommentService.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(addCommentService.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(addCommentService.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(fetchCommentListService.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(fetchCommentListService.fulfilled, (state, action) => {
                state.isLoading = false;
                state.commentList = action.payload;
            })
            .addCase(fetchCommentListService.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: commentActions } = commentSlice;
export const { reducer: commentReducer } = commentSlice;
