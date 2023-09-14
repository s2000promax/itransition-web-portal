import { memo } from 'react';
import { useParams } from 'react-router-dom';
import { Card } from '@/shared/UI-kit/Card';
import { Review } from '@/features/Review';
import { Work } from '@/features/Work';

interface WorkDetailsContainerProps {
    className?: string;
}

export const WorkDetailsContainer = memo((props: WorkDetailsContainerProps) => {
    const { className } = props;
    const { id } = useParams<{ id: string }>();

    return (
        <Card
            fullWidth
            border="partial"
            className={className}
            padding="24"
        >
            <Work id={id} />
        </Card>
    );
});
