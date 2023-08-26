import { memo } from 'react';
import { useParams } from 'react-router-dom';
import { Card } from '@/shared/UI-kit/Card';
import { Review } from '@/features/Review';

interface DetailsContainterProps {
    className?: string;
}

export const ReviewDetailsContainer = memo((props: DetailsContainterProps) => {
    const { className } = props;
    const { id } = useParams<{ id: string }>();

    return (
        <Card
            fullWidth
            border="partial"
            className={className}
            padding="24"
        >
            <Review id={id} />
        </Card>
    );
});
