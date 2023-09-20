export type { TagSchemaI } from './model/types/tag.interface';

export { getTagListSelector } from './model/selectors/getTagList/getTagList.selector';
export { getTagListIsLoadingSelector } from './model/selectors/getTagListIsLoading/getTagListIsLoading.selector';
export { getTagListErrorSelector } from './model/selectors/getTagListError/getTagListError.selector';
export { getTagCurrentDataSelector } from './model/selectors/getTagCurrentData/getTagCurrentData.selector';

export { tagActions, tagReducer } from './model/slice/tag.slice';

export { fetchTagListService } from './model/services/fetchTagList.service';
