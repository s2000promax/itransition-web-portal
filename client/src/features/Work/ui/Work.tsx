import { useTranslation } from 'react-i18next';
import { memo, useEffect } from 'react';
import { classNames } from '@/shared/libs/classNames/classNames';
import cls from './Work.module.scss';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/shared/libs/hooks/useAppDispatch/useAppDispatch';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/libs/components/DynamicModuleLoader';
import {
    fetchReviewByIdService,
    getReviewErrorSelector,
    getReviewIsLoadingSelector,
    reviewReducer,
} from '@/entities/Review';
import { ContentSkeleton } from '@/features/Review/ui/ContentSkeleton/ContentSkeleton';
import { Content } from '../ui/Content/Content';
import { VStack } from '@/shared/UI-kit/Stack';
import { Text } from '@/shared/UI-kit/Text';
import { fetchWorkDataService } from '@/entities/Work/model/services/fetchWorkData/fetchWorkData.service';
import { useInitialEffect } from '@/shared/libs/hooks/useInitialEffect/useInitialEffect';
import { workReducer } from '@/entities/Work';
import { BackButton } from '@/shared/UI-kit/BackButton';

interface WorkProps {
    className?: string;
    id?: string;
}

const reducers: ReducersList = {
    work: workReducer,
};

export const Work = memo((props: WorkProps) => {
    const { className, id } = props;
    const { t } = useTranslation('work');
    const dispatch = useAppDispatch();
    const isLoading = useSelector(getReviewIsLoadingSelector);
    const error = useSelector(getReviewErrorSelector);

    useInitialEffect(() => {
        if (id) {
            dispatch(fetchWorkDataService(id));
        }
    });

    let content;

    if (isLoading) {
        content = <ContentSkeleton />;
    } else if (error) {
        content = (
            <Text
                align="center"
                text={t('An error occurred while loading the work')}
            />
        );
    } else {
        content = <Content id={id} />;
    }

    return (
        <DynamicModuleLoader
            reducers={reducers}
            removeAfterUnmount
        >
            <VStack
                gap="16"
                max
                className={classNames(cls.Work, {}, [className])}
            >
                {content}
            </VStack>
        </DynamicModuleLoader>
    );
});
