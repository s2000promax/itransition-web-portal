import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getReviewDataSelector } from '@/entities/Review';
import { getRouteReviewEdit } from '@/shared/enums/router.enums';
import { Card } from '@/shared/UI-kit/Card';
import { AdditionalInfo } from './AdditionalInfo/AdditionalInfo';
import { classNames } from '@/shared/libs/classNames/classNames';

interface AdditionalInfoContainerProps {
    className?: string;
}

export const AdditionalInfoContainer = memo(
    (props: AdditionalInfoContainerProps) => {
        const { className } = props;
        const review = useSelector(getReviewDataSelector);

        const navigate = useNavigate();

        const onEditArticle = useCallback(() => {
            if (review) {
                navigate(getRouteReviewEdit(review.id));
            }
        }, [review, navigate]);

        if (!review) {
            return null;
        }

        return (
            <Card
                padding="24"
                border="partial"
                className={classNames('', {}, [className])}
            >
                <AdditionalInfo
                    onEdit={onEditArticle}
                    author={review.user}
                    createdAt={review.createdAt}
                    views={review.views}
                />
            </Card>
        );
    },
);
