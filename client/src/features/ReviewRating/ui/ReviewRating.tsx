import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { getUserDataSelector } from '@/entities/User';
import { Skeleton } from '@/shared/UI-kit/Skeleton';
import { useGetRating, useRate } from '@/entities/Rating';
import { RatingCard } from '@/features/UI/RatingCard';

export interface ReviewRatingProps {
    className?: string;
    reviewId: string;
}

const ReviewRating = memo((props: ReviewRatingProps) => {
    const { className, reviewId } = props;
    const { t } = useTranslation('review_rating');
    const userData = useSelector(getUserDataSelector);

    const { data, isLoading } = useGetRating({
        reviewId: reviewId,
        userId: userData?.id ?? '',
    });
    const [rateArticleMutation] = useRate();

    const handleRateArticle = useCallback(
        (starsCount: number, feedback?: string) => {
            try {
                rateArticleMutation({
                    userId: userData?.id ?? '',
                    reviewId: reviewId,
                    rate: starsCount,
                    feedback,
                });
            } catch (e) {
                console.log(e);
            }
        },
        [reviewId, rateArticleMutation, userData?.id],
    );

    const onAccept = useCallback(
        (starsCount: number, feedback?: string) => {
            handleRateArticle(starsCount, feedback);
        },
        [handleRateArticle],
    );

    const onCancel = useCallback(
        (starsCount: number) => {
            handleRateArticle(starsCount);
        },
        [handleRateArticle],
    );

    if (isLoading) {
        return (
            <Skeleton
                width="100%"
                height={120}
            />
        );
    }

    const rating = data?.[0];

    return (
        <RatingCard
            onCancel={onCancel}
            onAccept={onAccept}
            rate={rating?.rate}
            className={className}
            title={t('rate the review')}
            feedbackTitle={t('left your feedback')}
            hasFeedback
        />
    );
});

export default ReviewRating;
