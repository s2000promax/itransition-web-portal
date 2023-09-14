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
    const { t } = useTranslation();

    const typeTabs = useMemo<TabItem[]>(
        () => [
            {
                value: WorkTypeEnums.ALL,
                content: t('all'),
            },
            {
                value: WorkTypeEnums.IT,
                content: t('it'),
            },
            {
                value: WorkTypeEnums.MUSIC,
                content: t('music'),
            },
            {
                value: WorkTypeEnums.MOVIES,
                content: t('movies'),
            },
            {
                value: WorkTypeEnums.SCIENCE,
                content: t('science'),
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
