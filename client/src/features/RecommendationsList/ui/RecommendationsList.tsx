import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/libs/classNames/classNames';
import { useReviewRecommendationsList } from '@/entities/Recommendations';
import { VStack } from '@/shared/UI-kit/Stack';
import { Text } from '@/shared/UI-kit/Text';
import { ReviewList } from '@/features/ReviewList';

interface RecommendationsListProps {
    className?: string;
    reviewId: string;
}

export const RecommendationsList = memo((props: RecommendationsListProps) => {
    const { className, reviewId } = props;
    const { t } = useTranslation('recommendationsList');

    const {
        isLoading,
        data: reviews,
        error,
    } = useReviewRecommendationsList(reviewId);

    if (isLoading || error || !reviews) {
        return null;
    }

    return (
        <VStack
            data-testid="ReviewsRecommendationsList"
            gap="8"
            className={classNames('', {}, [className])}
        >
            <Text
                size="l"
                title={t('Recommended')}
            />
            <ReviewList
                reviewsList={reviews}
                target="_blank"
            />
        </VStack>
    );
});
