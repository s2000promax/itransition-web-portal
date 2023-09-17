import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/libs/classNames/classNames';
import { Page } from '@/widgets/Page';
import { useParams } from 'react-router-dom';
import { VStack } from '@/shared/UI-kit/Stack';
import { EditableConstructorCard } from '@/features/ReviewConstructor/EditableConstructorCard';

export interface ReviewCreatePageProps {
    className?: string;
}

const ReviewCreatePage = memo((props: ReviewCreatePageProps) => {
    const { className } = props;
    const { id } = useParams<{ id: string }>();

    return (
        <Page
            data-testid="ReviewCreatePage"
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

export default ReviewCreatePage;
