import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getReviewDataSelector } from '@/entities/Review';
import { Card } from '@/shared/UI-kit/Card';
import { UserOwnerReviewInfo } from '@/features/ReviewDetailsPage/ui/UserOwnerReviewInfoContainer/UserOwnerReviewInfo/UserOwnerReviewInfo';
import { classNames } from '@/shared/libs/classNames/classNames';
import { getRouteReviewEdit } from '@/shared/routes/routes.patterns';
import { Skeleton } from '@/shared/UI-kit/Skeleton';

interface UserOwnerReviewInfoContainerProps {
    className?: string;
}

export const UserOwnerReviewInfoContainer = memo(
    (props: UserOwnerReviewInfoContainerProps) => {
        const { className } = props;
        const review = useSelector(getReviewDataSelector);

        if (!review?.user) {
            return (
                <Skeleton
                    width="100%"
                    height={120}
                    border="16px"
                />
            );
        }

        return (
            <Card
                padding="24"
                border="partial"
                className={classNames('', {}, [className])}
            >
                <UserOwnerReviewInfo
                    authorReview={review.user}
                    createdAt={review.createdAt}
                    views={review.viewCount}
                    likes={0}
                />
            </Card>
        );
    },
);
