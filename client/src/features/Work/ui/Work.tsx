import { useTranslation } from 'react-i18next';
import { memo, useCallback, useEffect } from 'react';
import { classNames } from '@/shared/libs/classNames/classNames';
import cls from './Work.module.scss';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/shared/libs/hooks/useAppDispatch/useAppDispatch';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/libs/components/DynamicModuleLoader';
import {
    getReviewErrorSelector,
    getReviewIsLoadingSelector,
} from '@/entities/Review';
import { ContentSkeleton } from '../ui/ContentSkeleton/ContentSkeleton';
import { Content } from '../ui/Content/Content';
import { VStack } from '@/shared/UI-kit/Stack';
import { Text } from '@/shared/UI-kit/Text';

import { useInitialEffect } from '@/shared/libs/hooks/useInitialEffect/useInitialEffect';
import { fetchWorkByIdService, workReducer } from '@/entities/Work';
import { useDebounce } from '@/shared/libs/hooks/useDebounce/useDebounce';

interface WorkProps {
    className?: string;
    workId?: string;
}

export const Work = memo((props: WorkProps) => {
    const { className, workId } = props;
    const { t } = useTranslation('work');
    const dispatch = useAppDispatch();
    const isLoading = useSelector(getReviewIsLoadingSelector);
    const error = useSelector(getReviewErrorSelector);

    const handleFetchWorkById = useCallback(() => {
        if (workId) {
            dispatch(fetchWorkByIdService(workId));
        }
    }, [dispatch, workId]);

    const debounceFetchWorkById = useDebounce(handleFetchWorkById, 300);

    useEffect(() => {
        if (workId) {
            debounceFetchWorkById();
        }
    }, [workId]);

    let content;

    if (isLoading) {
        content = <ContentSkeleton />;
    } else if (error) {
        content = (
            <Text
                align="center"
                text={t('error')}
            />
        );
    } else {
        content = <Content id={workId} />;
    }

    return (
        <VStack
            gap="16"
            max
            className={classNames(cls.Work, {}, [className])}
        >
            {content}
        </VStack>
    );
});
