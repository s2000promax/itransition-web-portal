import { LanguageEnums } from '@/shared/enums/language.enums';

export interface AboutContentBlock {
    id: string;
    language: LanguageEnums;
    blockHeader: string;
    blockFirstSrc: string;
    blockSecondSrc: string;
    paragraph: string;
}

export interface AboutContent {
    language: LanguageEnums;
    appName: string;
    header: string;
    headerDescription: string;
    blocks: AboutContentBlock[];
}

export interface AboutContentSchemaI {
    content?: AboutContent;
    isLoading?: boolean;
    error?: string;
}
