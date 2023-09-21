import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getUserDataSelector } from '@/entities/User';
import { Skeleton } from '@/shared/UI-kit/Skeleton';
import { RatingCard } from '@/features/UI/RatingCard';
import { getWorkDataSelector } from '@/entities/Work';
import { useAppDispatch } from '@/shared/libs/hooks/useAppDispatch/useAppDispatch';
import {
    getRatingIsLoadingSelector,
    rateWorkByUserService,
} from '@/entities/Rating';

export interface WorkRatingProps {
    className?: string;
    reviewId: string;
}

const WorkRating = memo((props: WorkRatingProps) => {
    const { className, reviewId } = props;
    const { t } = useTranslation('work');
    const dispatch = useAppDispatch();
    const isLoading = useSelector(getRatingIsLoadingSelector);
    const userData = useSelector(getUserDataSelector);
    const workData = useSelector(getWorkDataSelector);
    const [rating, setRating] = useState(0);

    const handleRateReview = useCallback(
        (starsCount: number, feedback?: string) => {
            setRating(starsCount);
            dispatch(
                rateWorkByUserService({
                    userId: userData?.id!,
                    workId: workData?.id!,
                    rate: starsCount,
                    feedback,
                }),
            );
        },
        [reviewId, workData?.id, userData?.id],
    );

    const onAccept = useCallback(
        (starsCount: number, feedback?: string) => {
            handleRateReview(starsCount, feedback);
        },
        [handleRateReview],
    );

    const onCancel = useCallback(
        (starsCount: number) => {
            handleRateReview(starsCount);
        },
        [handleRateReview],
    );

    if (isLoading) {
        return (
            <Skeleton
                width="100%"
                height={120}
            />
        );
    }

    return (
        <RatingCard
            onCancel={onCancel}
            onAccept={onAccept}
            rate={rating}
            className={className}
            title={t('rate')}
            feedbackTitle={t('feedback')}
            hasFeedback
        />
    );
});

export default memo(WorkRating);
