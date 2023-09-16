import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/libs/classNames/classNames';
import { useReviewRecommendationsList } from '@/entities/Recommendations';
import { VStack } from '@/shared/UI-kit/Stack';
import { Text } from '@/shared/UI-kit/Text';
import { ReviewList } from '@/features/ReviewList';
import { useAppDispatch } from '@/shared/libs/hooks/useAppDispatch/useAppDispatch';

interface RecommendationsListProps {
    className?: string;
}

export const RecommendationsList = memo((props: RecommendationsListProps) => {
    const { className } = props;
    const { t } = useTranslation('recommendationsList');
    // const dispatch = useAppDispatch();
    const { isLoading, data: reviews, error } = useReviewRecommendationsList(3);

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
