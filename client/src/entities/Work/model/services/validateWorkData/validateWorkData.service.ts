import { WorkI } from '../../types/work.interface';
import { ValidateEnums } from '../../enums/validate.enums';

export const validateWorkDataService = (work?: WorkI) => {
    if (!work) {
        return [ValidateEnums.NO_DATA];
    }

    const { title, cover, description } = work;

    const errors: ValidateEnums[] = [];

    if (!title || !cover || !description) {
        errors.push(ValidateEnums.INCORRECT_WORK_DATA);
    }

    return errors;
};
