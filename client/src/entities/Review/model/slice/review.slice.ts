import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
    ReviewSchemaI,
    ReviewI,
    ReviewBlockT,
    ReviewTextBlockI,
    ReviewCodeBlockI,
    ReviewImageBlockI,
} from '../types/review.interface';
import { fetchReviewByIdService } from '../services/fetchReviewById/fetchReviewById.service';
import { Partial } from '@react-spring/web';
import { ReviewBlockTypeEnums, ReviewTypeEnums } from '@/entities/Review';

const initialState: ReviewSchemaI = {
    readonly: true,
    isLoading: false,
    error: undefined,
    data: undefined,
    form: {
        id: '',
        ownerId: '',
        title: '',
        subtitle: '',
        cover: '',
        type: [],
        blocks: [],
        viewCount: 0,
        likesCount: 0,
        averageRating: 0,
        ownerRating: 0,
        tags: [],
        createdAt: new Date(),
        updatedAt: new Date(),
    },
};

const reviewSlice = createSlice({
    name: 'review',
    initialState,
    reducers: {
        setReadonly: (state, action: PayloadAction<boolean>) => {
            state.readonly = action.payload;
        },
        cancelEdit: (state) => {
            state.readonly = true;
            state.validateErrors = undefined;
            // state.form = state.data;
        },
        updateFormReview: (state, action: PayloadAction<Partial<ReviewI>>) => {
            state.form = {
                ...state.form!,
                ...action.payload,
            };
        },
        updateReviewCover: (state, action: PayloadAction<string>) => {
            state.form!.cover = action.payload;
        },
        addReviewBlock: (state, action: PayloadAction<ReviewBlockT>) => {
            const newBlock = {
                ...action.payload,
                id: String(state.form!.blocks.length),
            };
            state.form!.blocks.push(newBlock);
        },
        removeReviewBlock: (state, action: PayloadAction<{ id: string }>) => {
            if (state.form?.blocks?.length) {
                state.form.blocks = state.form?.blocks
                    .filter((block) => block.id !== action.payload.id)
                    .map((block, index) => ({
                        ...block,
                        id: String(index + 1),
                    }));
            }
        },
        addTextParagraph: (state, action: PayloadAction<{ id: string }>) => {
            const indexBlock = state.form!.blocks.findIndex(
                (block) => block.id === action.payload.id,
            );
            if (
                indexBlock !== -1 &&
                state.form!.blocks[indexBlock].type ===
                    ReviewBlockTypeEnums.TEXT
            ) {
                const textBlock = state.form!.blocks[
                    indexBlock
                ] as ReviewTextBlockI;
                textBlock.paragraphs.push('');
            }
        },
        editTextParagraph: (
            state,
            action: PayloadAction<{
                blockId: string;
                paragraphIndex: number;
                content: string;
            }>,
        ) => {
            const indexBlock = state.form!.blocks.findIndex(
                (block) => block.id === action.payload.blockId,
            );
            if (
                indexBlock !== -1 &&
                state.form!.blocks[indexBlock].type ===
                    ReviewBlockTypeEnums.TEXT
            ) {
                const textBlock = state.form!.blocks[
                    indexBlock
                ] as ReviewTextBlockI;
                textBlock.paragraphs[action.payload.paragraphIndex] =
                    action.payload.content;
            }
        },
        editBlockTitle: (
            state,
            action: PayloadAction<{
                blockId: string;
                title: string;
            }>,
        ) => {
            const indexBlock = state.form!.blocks.findIndex(
                (block) => block.id === action.payload.blockId,
            );
            if (indexBlock !== -1) {
                const block = state.form!.blocks[indexBlock] as ReviewBlockT;
                block.title = action.payload.title;
            }
        },
        editCodeBlock: (
            state,
            action: PayloadAction<{
                blockId: string;
                code: string;
            }>,
        ) => {
            const indexBlock = state.form!.blocks.findIndex(
                (block) => block.id === action.payload.blockId,
            );
            if (
                indexBlock !== -1 &&
                state.form!.blocks[indexBlock].type ===
                    ReviewBlockTypeEnums.CODE
            ) {
                const codeBlock = state.form!.blocks[
                    indexBlock
                ] as ReviewCodeBlockI;
                codeBlock.code = action.payload.code;
            }
        },
        editImageBlock: (
            state,
            action: PayloadAction<{
                blockId: string;
                src: string;
            }>,
        ) => {
            const indexBlock = state.form!.blocks.findIndex(
                (block) => block.id === action.payload.blockId,
            );
            if (
                indexBlock !== -1 &&
                state.form!.blocks[indexBlock].type ===
                    ReviewBlockTypeEnums.IMAGE
            ) {
                const codeBlock = state.form!.blocks[
                    indexBlock
                ] as ReviewImageBlockI;
                codeBlock.src = action.payload.src;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchReviewByIdService.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(
                fetchReviewByIdService.fulfilled,
                (state, action: PayloadAction<ReviewI>) => {
                    state.isLoading = false;
                    state.data = action.payload;
                },
            )
            .addCase(fetchReviewByIdService.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: reviewActions } = reviewSlice;
export const { reducer: reviewReducer } = reviewSlice;
