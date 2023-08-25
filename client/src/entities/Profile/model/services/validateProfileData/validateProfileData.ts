import { ProfileI } from '../../types/profile.interface';
import { ValidateProfileEnums } from '../../enums/validateProfileEnums';

export const validateProfileData = (profile?: ProfileI) => {
    if (!profile) {
        return [ValidateProfileEnums.NO_DATA];
    }

    const { first, lastname } = profile;

    const errors: ValidateProfileEnums[] = [];

    if (!first || !lastname) {
        errors.push(ValidateProfileEnums.INCORRECT_USER_DATA);
    }

    return errors;
};
