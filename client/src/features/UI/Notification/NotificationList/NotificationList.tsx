import { memo } from 'react';
import { classNames } from '@/shared/libs/classNames/classNames';
import cls from './NotificationList.module.scss';
import { useNotifications } from '@/entities/UI/Notification';
import { VStack } from '@/shared/UI-kit/Stack';
import { Skeleton } from '@/shared/UI-kit/Skeleton';
import { NotificationItem } from '../NotificationItem/NotificationItem';
import { useSelector } from 'react-redux';
import { getLanguageSelector } from '@/entities/UI/UI';

interface NotificationListProps {
    className?: string;
}

export const NotificationList = memo((props: NotificationListProps) => {
    const { className } = props;
    const currentLanguage = useSelector(getLanguageSelector);
    const { data, isLoading } = useNotifications(currentLanguage, {
        pollingInterval: 10000,
    });

    if (isLoading) {
        return (
            <VStack
                gap="16"
                max
                className={classNames(cls.NotificationList, {}, [className])}
            >
                <Skeleton
                    width="100%"
                    border="8px"
                    height="80px"
                />
                <Skeleton
                    width="100%"
                    border="8px"
                    height="80px"
                />
                <Skeleton
                    width="100%"
                    border="8px"
                    height="80px"
                />
            </VStack>
        );
    }

    return (
        <VStack
            gap="16"
            max
            className={classNames(cls.NotificationList, {}, [className])}
        >
            {data?.map((item) => (
                <NotificationItem
                    key={item.id}
                    item={item}
                />
            ))}
        </VStack>
    );
});
