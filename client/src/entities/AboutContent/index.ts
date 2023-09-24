export type {
    AboutContentSchemaI,
    AboutContent,
    AboutContentBlock,
} from './model/types/aboutContent.interface';

export { getAboutContentSelector } from './model/selectors/getAboutContent/getAboutContent.selector';
export { getAboutContentIsLoadingSelector } from './model/selectors/getAboutContentIsLoading/getAboutContentIsLoading.selector';
export { getAboutContentErrorSelector } from './model/selectors/getAboutContentError/getAboutContentError.selector';

export { fetchAboutContentService } from './model/services/fetchAboutContent/fetchAboutContent.service';

export {
    aboutContentReducer,
    aboutContentActions,
} from './model/slice/aboutContent.slice';
