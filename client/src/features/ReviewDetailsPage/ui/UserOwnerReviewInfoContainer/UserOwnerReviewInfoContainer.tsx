import { memo } from 'react';
import { useSelector } from 'react-redux';
import { getReviewDataSelector } from '@/entities/Review';
import { UserOwnerReviewInfoCard } from '@/features/UserOwnerReviewInfoCard';

interface UserOwnerReviewInfoContainerProps {
    className?: string;
}

export const UserOwnerReviewInfoContainer = memo(
    (props: UserOwnerReviewInfoContainerProps) => {
        const { className } = props;
        const review = useSelector(getReviewDataSelector);

        return (
            <UserOwnerReviewInfoCard
                review={review}
                className={className}
            />
        );
    },
);
