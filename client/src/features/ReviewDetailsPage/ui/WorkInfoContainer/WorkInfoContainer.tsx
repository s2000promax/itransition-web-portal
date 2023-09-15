import { memo, useEffect } from 'react';
import { classNames } from '@/shared/libs/classNames/classNames';
import cls from './WorkInfoContainer.module.scss';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getReviewDataSelector } from '@/entities/Review';
import { Card } from '@/shared/UI-kit/Card';
import { WorkInfo } from './WorkInfo/WorkInfo';
import { getWorkDataSelector, getWorkIsLoadingSelector } from '@/entities/Work';
import { useAppDispatch } from '@/shared/libs/hooks/useAppDispatch/useAppDispatch';
import { fetchWorkDataService } from '@/entities/Work/model/services/fetchWorkData/fetchWorkData.service';
import { Skeleton } from '@/shared/UI-kit/Skeleton';

interface WorkInfoContainerProps {
    className?: string;
}

export const WorkInfoContainer = memo((props: WorkInfoContainerProps) => {
    const { className } = props;
    const dispatch = useAppDispatch();
    const review = useSelector(getReviewDataSelector);
    const work = useSelector(getWorkDataSelector);
    const isWorkLoading = useSelector(getWorkIsLoadingSelector);

    const navigate = useNavigate();

    useEffect(() => {
        if (review) {
            dispatch(fetchWorkDataService(review.workId));
        }
    }, [dispatch, review]);

    if (!review && !work) {
        return (
            <Skeleton
                width="100%"
                height={300}
                border="16px"
            />
        );
    }

    return (
        <Card
            padding="24"
            fullWidth
            border="partial"
            className={classNames(cls.WorkInfoContainer, {}, [className])}
        >
            <WorkInfo
                data={work}
                isLoading={isWorkLoading}
            />
        </Card>
    );
});
