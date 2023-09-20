import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import cls from './ConstructorCard.module.scss';
import { ConstructorCardError } from '@/features/ReviewConstructor/EditableConstructorCard/EditableConstructorCard/ConstructorCard/ConstructorCardError/ConstructorCardError';
import { ConstructorCardSkeleton } from '@/features/ReviewConstructor/EditableConstructorCard/EditableConstructorCard/ConstructorCard/ConstructorCardSkeleton/ConstructorCardSkeleton';
import { Card } from '@/shared/UI-kit/Card';
import { HStack, VStack } from '@/shared/UI-kit/Stack';
import { Input } from '@/shared/UI-kit/Input';
import { Text } from '@/shared/UI-kit/Text';
import { AppImage } from '@/shared/UI-kit/AppImage';
import { useAppDispatch } from '@/shared/libs/hooks/useAppDispatch/useAppDispatch';
import { uploadService } from '@/entities/Upload';
import { renderEditableBlocks } from './EditableBlocks/RenderEditableBlocks';
import {
    getReviewFormBlocksSelector,
    getReviewFormSelector,
    getReviewReadonlySelector,
    reviewActions,
} from '@/entities/Review';
import { OwnerRating } from '@/features/UI/OwnerRating';
import { ImageDragDropUploader } from '@/features/UI/ImageDragDropUploader';
import { TagSelector } from '@/features/UI/TagSelector';
import { TagsViewCard } from '@/features/UI/TagsViewCard';
import { getTagCurrentDataSelector } from '@/entities/Tag';

export interface ProfileCardProps {
    className?: string;
    // data?: Partial<ReviewI>;
    error?: string;
    isLoading?: boolean;
    // readonly?: boolean;
}

export const ConstructorCard = (props: ProfileCardProps) => {
    const {
        className,
        // data,
        isLoading,
        error,
        // readonly,
        // onChangeTitle,
        // onChangeSubtitle,
        // onChangeOwnerRating,
    } = props;

    const { t } = useTranslation('reviewConstructor');
    const dispatch = useAppDispatch();
    const formData = useSelector(getReviewFormSelector);
    const readonly = useSelector(getReviewReadonlySelector);
    const blocks = useSelector(getReviewFormBlocksSelector);

    const onChangeTitle = useCallback(
        (value?: string) => {
            dispatch(reviewActions.updateFormReview({ title: value || '' }));
        },
        [dispatch],
    );

    const onChangeOwnerRating = useCallback(
        (value?: number) => {
            dispatch(
                reviewActions.updateFormReview({ ownerRating: value || 0 }),
            );
        },
        [dispatch],
    );

    const handleFileUploaderChange = (file: File) => {
        dispatch(uploadService(file)).then((response) => {
            if (response.meta.requestStatus === 'fulfilled') {
                const url = Object.values(
                    response.payload as { url: string },
                ).join();

                dispatch(reviewActions.updateReviewCover(url));
            }
        });
    };

    if (isLoading) {
        return <ConstructorCardSkeleton />;
    }

    if (error) {
        return <ConstructorCardError />;
    }

    return (
        <Card
            padding="24"
            border="partial"
            fullWidth
            className={className}
        >
            <VStack
                max
                align="center"
                gap="16"
            >
                <Input
                    value={formData?.title || ''}
                    placeholder={t('Title')}
                    onChange={onChangeTitle}
                    readonly={readonly}
                />
                <Input
                    value={formData?.workTitle || ''}
                    placeholder={t('workTitle')}
                    readonly={true}
                />
                <Input
                    value={formData?.type || ''}
                    placeholder={t('type')}
                    readonly={true}
                />

                {formData?.cover && (
                    <AppImage
                        src={formData.cover}
                        alt={formData.cover}
                        className={cls.image}
                    />
                )}
                {!readonly && (
                    <ImageDragDropUploader
                        onUpload={handleFileUploaderChange}
                    />
                )}
            </VStack>

            {blocks && (
                <VStack
                    max
                    gap="32"
                >
                    {blocks.map(renderEditableBlocks)}
                </VStack>
            )}

            {!readonly && (
                <VStack
                    gap="16"
                    max
                    align="center"
                    className={cls.tagsContainer}
                >
                    <TagsViewCard />
                    <TagSelector />
                </VStack>
            )}

            {!readonly && (
                <HStack
                    justify="center"
                    gap="8"
                    className={cls.rateContainer}
                >
                    <Text text={t('you_rate')} />
                    <OwnerRating
                        onChangeOwnerRating={onChangeOwnerRating}
                        className={cls.ownerRating}
                    />
                    <Text text={String(formData?.ownerRating ?? 0)} />
                </HStack>
            )}
        </Card>
    );
};
