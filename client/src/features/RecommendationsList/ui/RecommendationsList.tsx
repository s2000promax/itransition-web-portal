import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/libs/classNames/classNames';
import { useReviewRecommendationsList } from '@/entities/Recommendations';
import { VStack } from '@/shared/UI-kit/Stack';
import { Text } from '@/shared/UI-kit/Text';
import { ReviewsList } from '@/features/ReviewsList';

interface RecommendationsListProps {
    className?: string;
}

export const RecommendationsList = memo((props: RecommendationsListProps) => {
    const { className } = props;
    const { t } = useTranslation('recommendations_list');
    const { isLoading, data: reviews, error } = useReviewRecommendationsList(3);

    if (isLoading || error || !reviews) {
        return null;
    }

    return (
        <VStack
            data-testid="ArticleRecommendationsList"
            gap="8"
            className={classNames('', {}, [className])}
        >
            <Text
                size="l"
                title={t('Recommended')}
            />
            <ReviewsList
                reviewsList={reviews}
                target="_blank"
            />
        </VStack>
    );
});
