import { WorkI } from '../../types/work.interface';
import { ValidateWorkEnums } from '../../enums/validateWork.enums';

export const validateWorkDataService = (work?: WorkI) => {
    if (!work) {
        return [ValidateWorkEnums.NO_DATA];
    }

    const { title, cover, description } = work;

    const errors: ValidateWorkEnums[] = [];

    if (!title || !cover || !description) {
        errors.push(ValidateWorkEnums.INCORRECT_WORK_DATA);
    }

    return errors;
};
