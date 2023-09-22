import { ValidateProfileEnums } from '../enums/validateProfileEnums';
import { ReviewI } from '@/entities/Review';

export interface ProfileI {
    id?: string;
    firstName?: string;
    lastName?: string;
    avatar?: string;
}

export interface ProfileSchemaI {
    data?: ProfileI;
    form?: ProfileI;
    userReviewList?: ReviewI[];
    isLoading: boolean;
    error?: string;
    readonly: boolean;
    validateErrors?: ValidateProfileEnums[];
}
