import { ValidateProfileEnums } from '../enums/validateProfileEnums';

export interface ProfileI {
    id?: string;
    first?: string;
    lastname?: string;
    username?: string;
    avatar?: string;
}

export interface ProfileSchemaI {
    data?: ProfileI;
    form?: ProfileI;
    isLoading: boolean;
    error?: string;
    readonly: boolean;
    validateErrors?: ValidateProfileEnums[];
}
