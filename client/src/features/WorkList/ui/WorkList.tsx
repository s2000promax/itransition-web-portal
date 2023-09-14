import { HTMLAttributeAnchorTarget, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/libs/classNames/classNames';
import cls from './WorkList.module.scss';
import { Text } from '@/shared/UI-kit/Text';
import { HStack } from '@/shared/UI-kit/Stack';
import { ListItemSkeleton } from './ListItemSkeleton/ListItemSkeleton';
import { ListItem } from './ListItem/ListItem';
import { ReviewViewEnums } from '@/entities/Review';
import { WorkI } from '@/entities/Work';

interface WorkListProps {
    className?: string;
    workList?: WorkI[];
    isLoading?: boolean;
    target?: HTMLAttributeAnchorTarget;
    view?: ReviewViewEnums;
}

const getSkeletons = (view: ReviewViewEnums) =>
    new Array(view === ReviewViewEnums.SMALL ? 9 : 3)
        .fill(0)
        .map((_, index) => (
            <ListItemSkeleton
                className={cls.card}
                key={index}
                view={view}
            />
        ));

export const WorkList = memo((props: WorkListProps) => {
    const {
        className,
        workList,
        view = ReviewViewEnums.SMALL,
        isLoading,
        target,
    } = props;
    const { t } = useTranslation('work');

    if (!isLoading && !workList?.length) {
        return (
            <div
                className={classNames(cls.WorkList, {}, [className, cls[view]])}
            >
                <Text
                    size="l"
                    text={t('work_no_found')}
                />
            </div>
        );
    }

    return (
        <HStack
            wrap="wrap"
            gap="16"
            className={classNames(cls.WorkList, {}, [])}
            data-testid="WorkList"
        >
            {workList &&
                workList.map((item) => (
                    <ListItem
                        work={item}
                        view={view}
                        target={target}
                        key={item.id}
                        className={cls.card}
                    />
                ))}
            {isLoading && getSkeletons(view)}
        </HStack>
    );
});
