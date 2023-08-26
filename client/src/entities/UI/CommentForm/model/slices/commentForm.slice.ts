import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CommentFormSchemaI } from '@/entities/UI/CommentForm';

const initialState: CommentFormSchemaI = {
    text: '',
};

const commentFormSlice = createSlice({
    name: 'commentForm',
    initialState,
    reducers: {
        setText: (state, action: PayloadAction<string>) => {
            state.text = action.payload;
        },
    },
});

export const { actions: commentFormActions } = commentFormSlice;
export const { reducer: commentFormReducer } = commentFormSlice;
