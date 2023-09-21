import React from 'react';
import { useTranslation } from 'react-i18next';
import { ProfileI } from '@/entities/Profile';
import { ProfileCardError } from '../ProfileCardError/ProfileCardError';
import { ProfileCardSkeleton } from '../ProfileCardSkeleton/ProfileCardSkeleton';
import { Card } from '@/shared/UI-kit/Card';
import { HStack, VStack } from '@/shared/UI-kit/Stack';
import { Input } from '@/shared/UI-kit/Input';
import { Avatar } from '@/shared/UI-kit/Avatar';
import { ImageDragDropUploader } from '@/features/UI/ImageDragDropUploader';

export interface ProfileCardProps {
    className?: string;
    data?: ProfileI;
    error?: string;
    isLoading?: boolean;
    readonly?: boolean;
    onChangeLastName?: (value?: string) => void;
    onChangeFirstName?: (value?: string) => void;
    onChangeAvatar: (file: File) => void;
}

export const ProfileCard = (props: ProfileCardProps) => {
    const {
        className,
        data,
        isLoading,
        error,
        readonly,
        onChangeFirstName,
        onChangeLastName,
        onChangeAvatar,
    } = props;

    const { t } = useTranslation('profile');

    if (isLoading) {
        return <ProfileCardSkeleton />;
    }

    if (error) {
        return <ProfileCardError />;
    }

    return (
        <Card
            padding="24"
            border="partial"
            fullWidth
            className={className}
        >
            <VStack gap="32">
                {data?.avatar && (
                    <HStack
                        justify="center"
                        max
                    >
                        <Avatar
                            size={128}
                            src={data?.avatar}
                        />
                    </HStack>
                )}

                {!readonly && (
                    <ImageDragDropUploader onUpload={onChangeAvatar} />
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
                            value={data?.firstName}
                            label={t('First Name')}
                            onChange={onChangeFirstName}
                            readonly={readonly}
                            data-testid="ProfileCard.firstname"
                        />
                        <Input
                            value={data?.lastName}
                            label={t('Last Name')}
                            onChange={onChangeLastName}
                            readonly={readonly}
                            data-testid="ProfileCard.lastname"
                        />
                    </VStack>
                </HStack>
            </VStack>
        </Card>
    );
};
