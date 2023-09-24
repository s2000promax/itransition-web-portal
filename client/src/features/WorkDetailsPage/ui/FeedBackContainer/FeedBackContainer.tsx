import { memo, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/libs/classNames/classNames';
import cls from './FeedBackContainer.module.scss';
import { Text } from '@/shared/UI-kit/Text';
import { VStack } from '@/shared/UI-kit/Stack';
import { FeedBackList } from './FeedBackList/FeedBackList';
import { useAppDispatch } from '@/shared/libs/hooks/useAppDispatch/useAppDispatch';
import {
    fetchFeedbackListService,
    getFeedbackListDataSelector,
} from '@/entities/UI/WorkDetailsPage';
import { useDebounce } from '@/shared/libs/hooks/useDebounce/useDebounce';
import { useSelector } from 'react-redux';
import { getDashboardIsLoadingSelector } from '@/entities/Dashboard';

interface FeedBackContainerProps {
    className?: string;
    workId?: string;
}

export const FeedBackContainer = memo((props: FeedBackContainerProps) => {
    const { className, workId } = props;
    const { t } = useTranslation('work');
    const dispatch = useAppDispatch();
    const feedbackList = useSelector(getFeedbackListDataSelector);
    const isLoading = useSelector(getDashboardIsLoadingSelector);

    const handleFetchFeedbackList = useCallback(() => {
        if (workId) {
            dispatch(fetchFeedbackListService(workId));
        }
    }, [dispatch, workId]);

    const debounceFetchFeedbackList = useDebounce(handleFetchFeedbackList, 300);

    useEffect(() => {
        if (workId) {
            debounceFetchFeedbackList();
        }
    }, [workId]);

    return (
        <VStack
            gap="16"
            max
            className={classNames(cls.FeedBackContainer, {}, [className])}
        >
            <Text
                size="l"
                title={t('Feedbacks')}
            />

            <FeedBackList
                isLoading={isLoading}
                feedbackList={feedbackList}
            />
        </VStack>
    );
});
