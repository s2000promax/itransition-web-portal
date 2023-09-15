import { memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getReviewDataSelector } from '@/entities/Review';
import { getWorkDataSelector } from '@/entities/Work';
import { useAppDispatch } from '@/shared/libs/hooks/useAppDispatch/useAppDispatch';
import { fetchWorkDataService } from '@/entities/Work/model/services/fetchWorkData/fetchWorkData.service';
import { WorkInfoCard } from '@/features/WorkInfoCard';

interface WorkInfoContainerProps {
    className?: string;
}

export const WorkInfoContainer = memo((props: WorkInfoContainerProps) => {
    const { className } = props;
    const dispatch = useAppDispatch();
    const review = useSelector(getReviewDataSelector);
    const work = useSelector(getWorkDataSelector);

    useEffect(() => {
        if (review) {
            dispatch(fetchWorkDataService(review.workId));
        }
    }, [dispatch, review]);

    return (
        <WorkInfoCard
            work={work}
            className={className}
        />
    );
});
