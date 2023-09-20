import { ReviewBlockTypeEnums } from '../enums/review.enums';
import { ValidateReviewEnums } from '@/entities/Review/model/enums/validateReview.enums';
import { UserI } from '@/entities/User';
import { WorkTypeEnums } from '@/entities/Work';

interface ReviewBlockBaseI {
    id?: string;
    sortId: number;
    type: ReviewBlockTypeEnums;
}

export interface ReviewCodeBlockI extends ReviewBlockBaseI {
    type: ReviewBlockTypeEnums.CODE;
    code: string;
    title: string;
}

export interface ReviewImageBlockI extends ReviewBlockBaseI {
    type: ReviewBlockTypeEnums.IMAGE;
    src: string;
    title: string;
}

export interface ReviewTextBlockParagraphI {
    id?: string;
    sortId: number;
    content: string;
}

export interface ReviewTextBlockI extends ReviewBlockBaseI {
    type: ReviewBlockTypeEnums.TEXT;
    title: string;
    paragraphs: ReviewTextBlockParagraphI[];
}

export type ReviewBlockT =
    | ReviewCodeBlockI
    | ReviewImageBlockI
    | ReviewTextBlockI;

export type FormDataI = Omit<
    ReviewI,
    'id' | 'createdAt' | 'updatedAt' | 'viewCounter'
>;

export interface ReviewI {
    id: string;
    workId: string;
    ownerId: string;
    title: string;
    workTitle: string;
    cover: string;
    type: WorkTypeEnums;
    tags: string[];
    blocks: ReviewBlockT[];
    createdAt: Date;
    updatedAt: Date;
    ownerRating: number;
    viewCounter: number;
    user?: UserI;
}

export interface ReviewSchemaI {
    data?: ReviewI;
    form?: FormDataI;
    readonly?: boolean;
    isLoading: boolean;
    error?: string;
    validateErrors?: ValidateReviewEnums[];
}
