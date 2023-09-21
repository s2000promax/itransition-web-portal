import { memo, ReactNode, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/libs/classNames/classNames';
import { Tabs } from '@/shared/UI-kit/Tabs';
import { WorkTypeEnums } from '@/entities/Work';

interface TabItem {
    value: string;
    content: ReactNode;
}

interface TypeTabsProps {
    className?: string;
    value: WorkTypeEnums;
    onChangeType: (type: WorkTypeEnums) => void;
}

export const TypeTabs = memo((props: TypeTabsProps) => {
    const { className, value, onChangeType } = props;
    const { t } = useTranslation('filters');

    const typeTabs = useMemo<TabItem[]>(
        () => [
            {
                value: WorkTypeEnums.ALL,
                content: t('All'),
            },
            {
                value: WorkTypeEnums.IT,
                content: t('It'),
            },
            {
                value: WorkTypeEnums.MUSIC,
                content: t('Music'),
            },
            {
                value: WorkTypeEnums.MOVIES,
                content: t('Movies'),
            },
            {
                value: WorkTypeEnums.GAMES,
                content: t('Games'),
            },
            {
                value: WorkTypeEnums.TECHNOLOGY,
                content: t('Technology'),
            },
            {
                value: WorkTypeEnums.STARTUPS,
                content: t('Startups'),
            },
            {
                value: WorkTypeEnums.SCIENCE,
                content: t('Science'),
            },
        ],
        [t],
    );

    const onTabClick = useCallback(
        (tab: TabItem) => {
            onChangeType(tab.value as WorkTypeEnums);
        },
        [onChangeType],
    );

    return (
        <Tabs
            direction="column"
            tabs={typeTabs}
            value={value}
            onTabClick={onTabClick}
            className={classNames('', {}, [className])}
        />
    );
});
