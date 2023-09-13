export type { WorkI, WorkSchemaI } from './model/types/work.interface';

export { getWorkDataSelector } from './model/selectors/getWorkData/getWorkData.selector';
export { getWorkFormSelector } from './model/selectors/getWorkForm/getWorkForm.selector';
export { getWorkIsLoadingSelector } from './model/selectors/getWorkIsLoading/getWorkIsLoading.selector';
export { getWorkReadonlySelector } from './model/selectors/getWorkReadonly/getWorkReadonly.selector';
export { getWorkErrorSelector } from './model/selectors/getWorkError/getWorkError.selector';
export { getWorkValidateErrorsSelector } from './model/selectors/getWorkValidateErrors/getWorkValidateErrors.selector';

export { workActions, workReducer } from './model/slice/work.slice';

export { fetchWorkDataService } from './model/services/fetchWorkData/fetchWorkData.service';
export { updateWorkDataService } from './model/services/updateWorkData/updateWorkData.service';
export { validateWorkDataService } from './model/services/validateWorkData/validateWorkData.service';

export { WorkTypeEnums } from './model/enums/work.enums';
