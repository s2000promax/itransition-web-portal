import React, { memo } from 'react';
import { classNames } from '@/shared/libs/classNames/classNames';
import { Page } from '@/widgets/Page';
import { useParams } from 'react-router-dom';
import { VStack } from '@/shared/UI-kit/Stack';
import { EditableConstructorCard } from '@/features/ReviewConstructor/EditableConstructorCard';

export interface ReviewEditPageProps {
    className?: string;
}

const ReviewEditPage = memo((props: ReviewEditPageProps) => {
    const { className } = props;
    const { id } = useParams<{ id: string }>();

    return (
        <Page
            data-testid="ReviewEditPage"
            className={classNames('', {}, [className])}
        >
            <VStack
                gap="16"
                max
            >
                <EditableConstructorCard id={id} />
            </VStack>
        </Page>
    );
});

export default ReviewEditPage;
