import { memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getReviewDataSelector } from '@/entities/Review';
import { getWorkDataSelector } from '@/entities/Work';
import { useAppDispatch } from '@/shared/libs/hooks/useAppDispatch/useAppDispatch';
import { fetchWorkByIdService } from '@/entities/Work/model/services/fetchWorkData/fetchWorkById.service';
import { WorkInfoCard } from '@/features/WorkInfoCard';
import { TagsViewCard } from '@/features/TagsViewCard';

interface WorkInfoContainerProps {
    className?: string;
}

export const TagsContainer = memo((props: WorkInfoContainerProps) => {
    const { className } = props;
    const dispatch = useAppDispatch();
    const review = useSelector(getReviewDataSelector);
    const work = useSelector(getWorkDataSelector);

    useEffect(() => {
        if (review) {
        }
    }, [dispatch, review]);

    return <TagsViewCard className={className} />;
});
