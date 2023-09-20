import { WorkTypeEnums } from '../enums/work.enums';
import { ValidateWorkEnums } from '../enums/validateWork.enums';
import { ReviewI } from '@/entities/Review';
import { RatingI } from '@/entities/Rating';

export interface WorkI {
    id?: string;
    title?: string;
    author?: string;
    releaseDate?: Date;
    cover?: string;
    description?: string;
    type?: WorkTypeEnums;
    averageUsersRating?: number;
    averageReviewsRating?: number;
    reviews?: ReviewI[];
    ratings?: RatingI[];
}

export interface WorkSchemaI {
    data?: WorkI;
    form?: WorkI;
    entities?: WorkI[];
    readonly: boolean;
    isLoading: boolean;
    error?: string;
    validateErrors?: ValidateWorkEnums[];
}
