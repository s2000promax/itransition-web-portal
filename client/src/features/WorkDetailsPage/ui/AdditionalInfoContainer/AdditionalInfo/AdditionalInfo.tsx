import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/libs/classNames/classNames';
import cls from './AdditionalInfo.module.scss';
import { UserI } from '@/entities/User';
import { HStack, VStack } from '@/shared/UI-kit/Stack';
import { Avatar } from '@/shared/UI-kit/Avatar';
import { Text } from '@/shared/UI-kit/Text';
import { Button } from '@/shared/UI-kit/Button';

interface AdditionalInfoProps {
    className?: string;
    author: UserI;
    createdAt: Date;
    views: number;
    onEdit: () => void;
}

export const AdditionalInfo = memo((props: AdditionalInfoProps) => {
    const { className, author, createdAt, views, onEdit } = props;
    const { t } = useTranslation();

    return (
        <VStack
            gap="32"
            className={classNames(cls.AdditionalInfo, {}, [className])}
        >
            <HStack gap="8">
                <Avatar
                    src={author.avatar}
                    size={32}
                />
                <Text
                    text={author.firstName}
                    bold
                />
                <Text
                    // text={createdAt.toDateString()}
                    text={'Data'}
                />
            </HStack>
            <Button onClick={onEdit}>{t('edit')}</Button>
            <Text text={t('{{count}} views', { count: views })} />
        </VStack>
    );
});
