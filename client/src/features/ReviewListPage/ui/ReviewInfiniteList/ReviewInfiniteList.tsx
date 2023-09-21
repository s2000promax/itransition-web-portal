import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import {
    getReviewList,
    getReviewListPageIsLoadingSelector,
    getReviewListPageErrorSelector,
    getReviewListPageViewSelector,
} from '@/entities/UI/ReviewListPage';
import { Text } from '@/shared/UI-kit/Text';
import { ReviewList } from '@/features/ReviewList';

interface ReviewInfiniteListProps {
    className?: string;
}

export const ReviewInfiniteList = memo((props: ReviewInfiniteListProps) => {
    const { className } = props;
    const reviewsList = useSelector(getReviewList.selectAll);
    const isLoading = useSelector(getReviewListPageIsLoadingSelector);
    const view = useSelector(getReviewListPageViewSelector);
    const error = useSelector(getReviewListPageErrorSelector);
    const { t } = useTranslation('reviewList');

    if (error) {
        return (
            <Text
                size="l"
                text={t('error')}
            />
        );
    }

    return (
        <ReviewList
            isLoading={isLoading}
            view={view}
            reviewsList={reviewsList}
            className={className}
        />
    );
});
