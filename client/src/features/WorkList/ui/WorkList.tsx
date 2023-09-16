import { HTMLAttributeAnchorTarget, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/libs/classNames/classNames';
import cls from './WorkList.module.scss';
import { Text } from '@/shared/UI-kit/Text';
import { HStack } from '@/shared/UI-kit/Stack';
import { ListItemSkeleton } from './ListItemSkeleton/ListItemSkeleton';
import { ListItem } from './ListItem/ListItem';
import { WorkI } from '@/entities/Work';
import { ViewEnums } from '@/entities/UI/UI';

interface WorkListProps {
    className?: string;
    workList?: WorkI[];
    isLoading?: boolean;
    target?: HTMLAttributeAnchorTarget;
    view?: ViewEnums;
}

const getSkeletons = (view: ViewEnums) =>
    new Array(view === ViewEnums.SMALL ? 9 : 3).fill(0).map((_, index) => (
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
        view = ViewEnums.SMALL,
        isLoading,
        target,
    } = props;
    const { t } = useTranslation('workList');

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
