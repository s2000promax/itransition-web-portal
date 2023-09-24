import React, { memo, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from '@/widgets/Page';
import { AboutPageContent } from '@/features/AboutPageContent';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/libs/components/DynamicModuleLoader';
import {
    aboutContentReducer,
    fetchAboutContentService,
} from '@/entities/AboutContent';
import { useAppDispatch } from '@/shared/libs/hooks/useAppDispatch/useAppDispatch';
import { useDebounce } from '@/shared/libs/hooks/useDebounce/useDebounce';
import { useInitialEffect } from '@/shared/libs/hooks/useInitialEffect/useInitialEffect';
import { useSelector } from 'react-redux';
import { getLanguageSelector } from '@/entities/UI/UI';

const reducers: ReducersList = {
    aboutContent: aboutContentReducer,
};

const AboutPage = () => {
    const dispatch = useAppDispatch();
    const language = useSelector(getLanguageSelector);

    const handleFetchAboutContent = useCallback(() => {
        dispatch(fetchAboutContentService());
    }, [dispatch]);

    const debounceFetchAboutContent = useDebounce(handleFetchAboutContent, 300);

    useEffect(() => {
        debounceFetchAboutContent();
    }, [dispatch, language]);

    return (
        <DynamicModuleLoader
            reducers={reducers}
            removeAfterUnmount
        >
            <Page>
                <AboutPageContent />
            </Page>
        </DynamicModuleLoader>
    );
};

export default memo(AboutPage);
