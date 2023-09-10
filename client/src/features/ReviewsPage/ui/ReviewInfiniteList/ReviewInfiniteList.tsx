import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import {
    getReviews,
    getReviewsPageIsLoadingSelector,
    getReviewsPageErrorSelector,
    getReviewsPageViewSelector,
} from '@/entities/UI/ReviewsPage';
import { Text } from '@/shared/UI-kit/Text';
import { ReviewList } from '@/features/ReviewList';

interface ArticleInfiniteListProps {
    className?: string;
}

export const ReviewInfiniteList = memo((props: ArticleInfiniteListProps) => {
    const { className } = props;
    const reviewsList = useSelector(getReviews.selectAll);
    const isLoading = useSelector(getReviewsPageIsLoadingSelector);
    const view = useSelector(getReviewsPageViewSelector);
    const error = useSelector(getReviewsPageErrorSelector);
    const { t } = useTranslation('reviews_page');

    if (error) {
        return (
            <Text
                size="l"
                text={t('An error occurred while loading the article')}
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
