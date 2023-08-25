import { memo } from 'react';
import { classNames } from '@/shared/libs/classNames/classNames';
import { Card } from '@/shared/UI-kit/Card';
import { Skeleton } from '@/shared/UI-kit/Skeleton';
import { ReviewViewEnums } from '@/entities/Review';
import cls from './listItemSkeleton.module.scss';

interface ListItemSkeletonProps {
    className?: string;
    view: ReviewViewEnums;
}

export const ListItemSkeleton = memo((props: ListItemSkeletonProps) => {
    const { className, view } = props;

    const mainClass = cls.ListItem;

    if (view === ReviewViewEnums.BIG) {
        const cardContent = (
            <>
                <div className={cls.header}>
                    <Skeleton
                        border="50%"
                        height={30}
                        width={30}
                    />
                    <Skeleton
                        width={150}
                        height={16}
                        className={cls.username}
                    />
                    <Skeleton
                        width={150}
                        height={16}
                        className={cls.date}
                    />
                </div>
                <Skeleton
                    width={250}
                    height={24}
                    className={cls.title}
                />
                <Skeleton
                    height={200}
                    className={cls.img}
                />
                <div className={cls.footer}>
                    <Skeleton
                        height={36}
                        width={200}
                    />
                </div>
            </>
        );
        return (
            <div className={classNames(mainClass, {}, [className, cls[view]])}>
                <Card
                    border="round"
                    className={cls.card}
                >
                    {cardContent}
                </Card>
            </div>
        );
    }

    const cardContent = (
        <>
            <Skeleton
                width="100%"
                height={150}
                border="32px"
                className={cls.img}
            />
            <div className={cls.infoWrapper}>
                <Skeleton
                    width={130}
                    height={16}
                />
            </div>
            <Skeleton
                width={150}
                height={16}
                className={cls.title}
            />
        </>
    );

    return (
        <div className={classNames(mainClass, {}, [className, cls[view]])}>
            <Card
                border="round"
                className={cls.card}
            >
                {cardContent}
            </Card>
        </div>
    );
});
