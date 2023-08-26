import React from 'react';
import { useTranslation } from 'react-i18next';
import { ProfileI } from '@/entities/Profile';
import { ProfileCardError } from '../ProfileCardError/ProfileCardError';
import { ProfileCardSkeleton } from '../ProfileCardSkeleton/ProfileCardSkeleton';
import { Card } from '@/shared/UI-kit/Card';
import { HStack, VStack } from '@/shared/UI-kit/Stack';
import { Input } from '@/shared/UI-kit/Input';
import { Avatar } from '@/shared/UI-kit/Avatar';

export interface ProfileCardProps {
    className?: string;
    data?: ProfileI;
    error?: string;
    isLoading?: boolean;
    readonly?: boolean;
    onChangeLastname?: (value?: string) => void;
    onChangeFirstname?: (value?: string) => void;
    onChangeCity?: (value?: string) => void;
    onChangeAge?: (value?: string) => void;
    onChangeUsername?: (value?: string) => void;
    onChangeAvatar?: (value?: string) => void;
}

export const ProfileCard = (props: ProfileCardProps) => {
    const {
        className,
        data,
        isLoading,
        error,
        readonly,
        onChangeFirstname,
        onChangeLastname,
        onChangeAvatar,
        onChangeUsername,
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
                <HStack
                    gap="24"
                    max
                >
                    <VStack
                        gap="16"
                        max
                    >
                        <Input
                            value={data?.first}
                            label={t('firstName')}
                            onChange={onChangeFirstname}
                            readonly={readonly}
                            data-testid="ProfileCard.firstname"
                        />
                        <Input
                            value={data?.lastname}
                            label={t('lastName')}
                            onChange={onChangeLastname}
                            readonly={readonly}
                            data-testid="ProfileCard.lastname"
                        />
                    </VStack>
                    <VStack
                        gap="16"
                        max
                    >
                        <Input
                            value={data?.username}
                            label={t('userName')}
                            onChange={onChangeUsername}
                            readonly={readonly}
                        />
                        <Input
                            value={data?.avatar}
                            label={t('link')}
                            onChange={onChangeAvatar}
                            readonly={readonly}
                        />
                    </VStack>
                </HStack>
            </VStack>
        </Card>
    );
};
