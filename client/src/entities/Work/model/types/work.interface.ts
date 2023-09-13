import { WorkTypeEnums } from '../enums/work.enums';
import { ValidateEnums } from '../enums/validate.enums';
import { ReviewI } from '@/entities/Review';
import { RatingI } from '@/entities/Rating';

export interface WorkI {
    id: string;
    title: string;
    cover: string;
    description: string;
    type: WorkTypeEnums;
    averageRating: number;
    reviews?: ReviewI[];
    ratings?: RatingI[];
}

export interface WorkSchemaI {
    data?: WorkI;
    form?: WorkI;
    readonly: boolean;
    isLoading: boolean;
    error?: string;
    validateErrors?: ValidateEnums[];
}
