import { UserI } from '@/entities/User';
import { ReviewBlockTypeEnums, ReviewTypeEnums } from '../enums/review.enums';

interface ReviewBlockBaseI {
    id: string;
    type: ReviewBlockTypeEnums;
}

export interface ReviewCodeBlockI extends ReviewBlockBaseI {
    type: ReviewBlockTypeEnums.CODE;
    code: string;
}

export interface ReviewImageBlockI extends ReviewBlockBaseI {
    type: ReviewBlockTypeEnums.IMAGE;
    src: string;
    title: string;
}

export interface ReviewTextBlockI extends ReviewBlockBaseI {
    type: ReviewBlockTypeEnums.TEXT;
    paragraphs: string[];
    title?: string;
}

export type ReviewBlockT =
    | ReviewCodeBlockI
    | ReviewImageBlockI
    | ReviewTextBlockI;

export interface ReviewI {
    id: string;
    title: string;
    user: UserI;
    subtitle: string;
    img: string;
    views: number;
    createdAt: string;
    type: ReviewTypeEnums[];
    blocks: ReviewBlockT[];
}

export interface ReviewSchemaI {
    isLoading: boolean;
    error?: string;
    data?: ReviewI;
}
