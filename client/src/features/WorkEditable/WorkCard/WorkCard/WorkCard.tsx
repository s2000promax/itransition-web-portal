import React from 'react';
import { useTranslation } from 'react-i18next';
import { ProfileI } from '@/entities/Profile';
import { WorkCardError } from '@/features/WorkEditable/WorkCard/WorkCardError/WorkCardError';
import { WorkCardSkeleton } from '@/features/WorkEditable/WorkCard/WorkCardSkeleton/WorkCardSkeleton';
import { Card } from '@/shared/UI-kit/Card';
import { HStack, VStack } from '@/shared/UI-kit/Stack';
import { Input } from '@/shared/UI-kit/Input';
import { Avatar } from '@/shared/UI-kit/Avatar';
import { ImageDragDropUploader } from '@/features/UI/ImageDragDropUploader';
import { WorkI } from '@/entities/Work';
import cls from '@/features/ReviewConstructor/EditableConstructorCard/EditableConstructorCard/ConstructorCard/ConstructorCard/EditableBlocks/EditableImageBlock/EditableImageBlock.module.scss';
import { AppImage } from '@/shared/UI-kit/AppImage';
import { TextArea } from '@/shared/UI-kit/TextArea';

export interface WorkCardProps {
    className?: string;
    data?: WorkI;
    error?: string;
    isLoading?: boolean;
    readonly?: boolean;
    onChangeTitle?: (value?: string) => void;
    onChangeAuthor?: (value?: string) => void;
    onChangeReleaseDate?: (value?: Date) => void;
    onChangeDescription?: (value?: string) => void;
    onChangeCover: (file: File) => void;
}

export const WorkCard = (props: WorkCardProps) => {
    const {
        className,
        data,
        isLoading,
        error,
        readonly,
        onChangeTitle,
        onChangeAuthor,
        onChangeReleaseDate,
        onChangeDescription,
        onChangeCover,
    } = props;

    const { t } = useTranslation('work');

    if (isLoading) {
        return <WorkCardSkeleton />;
    }

    if (error) {
        return <WorkCardError />;
    }

    return (
        <Card
            padding="24"
            border="partial"
            fullWidth
            className={className}
        >
            <VStack gap="32">
                {data?.cover && (
                    <HStack
                        justify="center"
                        max
                    >
                        <AppImage
                            src={data.cover}
                            alt={data.title}
                            className={cls.image}
                        />
                    </HStack>
                )}

                {!readonly && (
                    <ImageDragDropUploader onUpload={onChangeCover} />
                )}

                <HStack
                    gap="24"
                    max
                >
                    <VStack
                        gap="16"
                        max
                    >
                        <Input
                            value={data?.title}
                            label={t('title')}
                            onChange={onChangeTitle}
                            readonly={readonly}
                            data-testid="WorkCard.title"
                        />
                        <Input
                            value={data?.author}
                            label={t('author')}
                            onChange={onChangeAuthor}
                            readonly={readonly}
                            data-testid="WorkCard.author"
                        />
                        <Input
                            value={'DAte'}
                            label={t('releaseDate')}
                            // onChange={onChangeReleaseDate}
                            readonly={readonly}
                            data-testid="WorkCard.releaseDate"
                        />
                        <TextArea
                            value={data?.description}
                            placeholder={t('description')}
                            onChange={onChangeDescription}
                            readonly={readonly}
                            className={cls.description}
                        />
                    </VStack>
                </HStack>
            </VStack>
        </Card>
    );
};
