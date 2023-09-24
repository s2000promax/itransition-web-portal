import React, { memo, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/shared/libs/hooks/useAppDispatch/useAppDispatch';
import { ReviewInfoCard } from '@/features/Cards/ReviewInfoCard';
import {
    fetchRecommendationReviewListService,
    getRecommendationReviewListDataSelector,
} from '@/entities/UI/WorkDetailsPage';
import { useDebounce } from '@/shared/libs/hooks/useDebounce/useDebounce';

interface RecommendationReviewsContainerProps {
    className?: string;
    workId?: string;
}

export const RecommendationReviewsContainer = memo(
    (props: RecommendationReviewsContainerProps) => {
        const { className, workId } = props;
        const dispatch = useAppDispatch();

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
                <>
                    {recommendationReviewList.map((review) => (
                        <React.Fragment key={review.id}>
                            <ReviewInfoCard review={review} />
                        </React.Fragment>
                    ))}
                </>
            );
        }
    },
);
