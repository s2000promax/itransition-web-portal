import { memo } from 'react';
import { classNames } from '@/shared/libs/classNames/classNames';
import cls from './NotificationItem.module.scss';
import { NotificationI } from '@/entities/UI/Notification';
import { Text } from '@/shared/UI-kit/Text';
import { Card } from '@/shared/UI-kit/Card';

interface NotificationItemProps {
    className?: string;
    item: NotificationI;
}

export const NotificationItem = memo((props: NotificationItemProps) => {
    const { className, item } = props;

    const content = (
        <Card className={classNames(cls.NotificationItem, {}, [className])}>
            <Text
                title={item.title}
                text={item.description}
            />
        </Card>
    );

    if (item.href) {
        return (
            <a
                className={cls.link}
                target="_blank"
                href={item.href}
                rel="noreferrer"
            >
                {content}
            </a>
        );
    }

    return content;
});
