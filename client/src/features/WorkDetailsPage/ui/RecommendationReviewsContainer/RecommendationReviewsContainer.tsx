import React, { memo, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/shared/libs/hooks/useAppDispatch/useAppDispatch';
import { ReviewInfoCard } from '@/features/Cards/ReviewInfoCard';
import {
    fetchRecommendationReviewListService,
    getRecommendationReviewListDataSelector,
} from '@/entities/UI/WorkDetailsPage';
import { useDebounce } from '@/shared/libs/hooks/useDebounce/useDebounce';
import { VStack } from '@/shared/UI-kit/Stack';
import { Text } from '@/shared/UI-kit/Text';
import { useTranslation } from 'react-i18next';

interface RecommendationReviewsContainerProps {
    className?: string;
    workId?: string;
}

export const RecommendationReviewsContainer = memo(
    (props: RecommendationReviewsContainerProps) => {
        const { className, workId } = props;
        const dispatch = useAppDispatch();
        const { t } = useTranslation('recommendationsList');

        const recommendationReviewList = useSelector(
            getRecommendationReviewListDataSelector,
        );

        const handleFetchRecommendationReviewList = useCallback(() => {
            if (workId) {
                dispatch(fetchRecommendationReviewListService(workId));
            }
        }, [dispatch, workId]);

        const debounceFetchRecommendationReviewList = useDebounce(
            handleFetchRecommendationReviewList,
            300,
        );

        useEffect(() => {
            if (workId) {
                debounceFetchRecommendationReviewList();
            }
        }, [workId]);

        if (recommendationReviewList) {
            return (
                <VStack gap="16">
                    <Text
                        size="m"
                        title={t('Recommended')}
                    />
                    {recommendationReviewList.map((review) => (
                        <React.Fragment key={review.id}>
                            <ReviewInfoCard review={review} />
                        </React.Fragment>
                    ))}
                </VStack>
            );
        }
    },
);
