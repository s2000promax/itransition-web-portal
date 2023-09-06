import { ReviewBlockTypeEnums, ReviewTypeEnums } from '../enums/review.enums';
import { ValidateReviewEnums } from '@/entities/Review/model/enums/validateReview.enums';
import { UserI } from '@/entities/User';

interface ReviewBlockBaseI {
    id: string;
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

export interface ReviewTextBlockI extends ReviewBlockBaseI {
    type: ReviewBlockTypeEnums.TEXT;
    paragraphs: string[];
    title: string;
}

export type ReviewBlockT =
    | ReviewCodeBlockI
    | ReviewImageBlockI
    | ReviewTextBlockI;

export interface ReviewI {
    id: string;
    ownerId: string;
    title: string;
    subtitle: string;
    cover: string;
    type: ReviewTypeEnums[];
    tags: [];
    blocks: ReviewBlockT[];
    createdAt: Date;
    updatedAt: Date;
    ownerRating: number;
    averageRating: number;
    viewCount: number;
    likesCount: number;
    user?: UserI;
}

export interface ReviewSchemaI {
    data?: ReviewI;
    form?: ReviewI;
    readonly?: boolean;
    isLoading: boolean;
    error?: string;
    validateErrors?: ValidateReviewEnums[];
}
