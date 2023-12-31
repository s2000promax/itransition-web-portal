import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
    ReviewBlockT,
    ReviewCodeBlockI,
    ReviewI,
    ReviewImageBlockI,
    ReviewSchemaI,
    ReviewTextBlockI,
} from '../types/review.interface';
import { fetchReviewByIdService } from '../services/fetchReviewById/fetchReviewById.service';
import { Partial } from '@react-spring/web';
import {
    createReviewService,
    ReviewBlockTypeEnums,
    updateReviewService,
} from '@/entities/Review';
import { WorkTypeEnums } from '@/entities/Work';

const initialState: ReviewSchemaI = {
    readonly: true,
    isLoading: false,
    error: undefined,
    data: undefined,
    form: undefined,
};

const initialForm: Omit<
    ReviewI,
    'id' | 'createdAt' | 'updatedAt' | 'viewCounter'
> = {
    workId: '',
    ownerId: '',
    title: '',
    workTitle: '',
    cover: '',
    type: 'ALL' as WorkTypeEnums,
    blocks: [],
    ownerRating: 0,
    tags: [],
};

const reviewSlice = createSlice({
    name: 'review',
    initialState,
    reducers: {
        setReadonly: (state, action: PayloadAction<boolean>) => {
            state.readonly = action.payload;
            // state.form = initialForm;
        },
        cancelEdit: (state) => {
            state.readonly = true;
            state.validateErrors = undefined;
            state.form = state.data;
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
            const newBlock: ReviewBlockT = {
                ...action.payload,
                sortId: state.form!.blocks?.length ?? 0,
            };

            if (state.form && typeof state.form?.blocks === 'undefined') {
                state.form.blocks = [];
            }

            state.form!.blocks?.push(newBlock);
        },
        removeReviewBlock: (state, action: PayloadAction<{ id: number }>) => {
            if (state.form?.blocks?.length) {
                state.form.blocks = state.form?.blocks
                    .filter((block) => block.sortId !== action.payload.id)
                    .map((block, index) => ({
                        ...block,
                        sortId: index,
                    }));
            } else {
                state.form!.blocks = [];
            }
        },
        addTextParagraph: (state, action: PayloadAction<{ id: number }>) => {
            const indexBlock =
                state.form!.blocks?.findIndex(
                    (block) => block.sortId === action.payload.id,
                ) ?? -1;
            if (
                indexBlock !== -1 &&
                state.form!.blocks[indexBlock].type ===
                    ReviewBlockTypeEnums.TEXT
            ) {
                const textBlock = state.form!.blocks[
                    indexBlock
                ] as ReviewTextBlockI;
                textBlock.paragraphs.push({
                    sortId: textBlock.paragraphs?.length ?? 0,
                    content: '',
                });
            }
        },
        editTextParagraph: (
            state,
            action: PayloadAction<{
                sortId: number;
                paragraphIndex: number;
                content: string;
            }>,
        ) => {
            const indexBlock = state.form!.blocks.findIndex(
                (block) => block.sortId === action.payload.sortId,
            );
            if (
                indexBlock !== -1 &&
                state.form!.blocks[indexBlock].type ===
                    ReviewBlockTypeEnums.TEXT
            ) {
                const textBlock = state.form!.blocks[
                    indexBlock
                ] as ReviewTextBlockI;
                textBlock.paragraphs[action.payload.paragraphIndex].content =
                    action.payload.content;
            }
        },
        editBlockTitle: (
            state,
            action: PayloadAction<{
                sortId: number;
                title: string;
            }>,
        ) => {
            const indexBlock = state.form!.blocks?.findIndex(
                (block) => block.sortId === action.payload.sortId,
            );
            if (indexBlock !== -1) {
                const block = state.form!.blocks[indexBlock] as ReviewBlockT;
                block.title = action.payload?.title;
            }
        },
        editCodeBlock: (
            state,
            action: PayloadAction<{
                sortId: number;
                code: string;
            }>,
        ) => {
            const indexBlock = state.form!.blocks?.findIndex(
                (block) => block.sortId === action.payload.sortId,
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
                sortId: number;
                src: string;
            }>,
        ) => {
            const indexBlock = state.form!.blocks?.findIndex(
                (block) => block.sortId === action.payload.sortId,
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
        addTag: (state, action: PayloadAction<string>) => {
            if (action.payload && !state.form?.tags?.includes(action.payload)) {
                if (state.form && typeof state.form?.tags === 'undefined') {
                    state.form = {
                        ...state.form,
                        tags: [],
                    };
                }
                state.form?.tags.push(action.payload);
            }
        },
        deleteTag: (state, action: PayloadAction<string>) => {
            if (state?.form?.tags?.length && action.payload) {
                state.form.tags = state.form.tags.filter(
                    (tag) => tag !== action.payload,
                );
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
            })
            .addCase(createReviewService.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(createReviewService.fulfilled, (state) => {
                state.isLoading = false;
                state.readonly = true;
            })
            .addCase(createReviewService.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(updateReviewService.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(updateReviewService.fulfilled, (state) => {
                state.isLoading = false;
                if (state?.form && state?.data) {
                    state.data = { ...state.data, ...state.form };
                    state.readonly = true;
                }
            })
            .addCase(updateReviewService.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: reviewActions } = reviewSlice;
export const { reducer: reviewReducer } = reviewSlice;
