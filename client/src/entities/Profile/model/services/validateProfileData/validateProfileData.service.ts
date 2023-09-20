import { ProfileI } from '../../types/profile.interface';
import { ValidateProfileEnums } from '../../enums/validateProfileEnums';

export const validateProfileData = (profile?: ProfileI) => {
    if (!profile) {
        return [ValidateProfileEnums.NO_DATA];
    }

    const { firstName, lastName } = profile;

    const errors: ValidateProfileEnums[] = [];

    if (!firstName || !lastName) {
        errors.push(ValidateProfileEnums.INCORRECT_USER_DATA);
    }

    return errors;
};
