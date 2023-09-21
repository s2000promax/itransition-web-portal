import { memo } from 'react';
import { TagsViewCard } from '@/features/TagsViewCard';

interface WorkInfoContainerProps {
    className?: string;
}

export const TagsContainer = memo((props: WorkInfoContainerProps) => {
    const { className } = props;

    return <TagsViewCard className={className} />;
});
