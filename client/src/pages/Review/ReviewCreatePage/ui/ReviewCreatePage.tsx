import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/libs/classNames/classNames';
import { Page } from '@/widgets/Page';
import { useParams } from 'react-router-dom';
import { VStack } from '@/shared/UI-kit/Stack';
import { EditableConstructorCard } from '@/features/ReviewConstructor/EditableConstructorCard';

interface ReviewCreatePageProps {
    className?: string;
}

const ReviewCreatePage = memo((props: ReviewCreatePageProps) => {
    const { className } = props;
    const { t } = useTranslation('review_edit');
    const { id } = useParams<{ id: string }>();
    const isEdit = Boolean(id);

    return (
        // <Page className={classNames(cls.ReviewEditPage, {}, [className])}>
        //     {isEdit ? t('Edit review by ID ') + id : t('Create new review')}
        //     <CreateReview />
        // </Page>
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
