import { memo, ReactNode, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/libs/classNames/classNames';
import { ReviewTypeEnums } from '@/entities/Review';
import { Tabs } from '@/shared/UI-kit/Tabs';

interface TabItem {
    value: string;
    content: ReactNode;
}

interface TypeTabsProps {
    className?: string;
    value: ReviewTypeEnums;
    onChangeType: (type: ReviewTypeEnums) => void;
}

export const TypeTabs = memo((props: TypeTabsProps) => {
    const { className, value, onChangeType } = props;
    const { t } = useTranslation();

    const typeTabs = useMemo<TabItem[]>(
        () => [
            {
                value: ReviewTypeEnums.ALL,
                content: t('all'),
            },
            {
                value: ReviewTypeEnums.IT,
                content: t('it'),
            },
            {
                value: ReviewTypeEnums.MUSIC,
                content: t('music'),
            },
            {
                value: ReviewTypeEnums.MOVIES,
                content: t('movies'),
            },
            {
                value: ReviewTypeEnums.SCIENCE,
                content: t('science'),
            },
        ],
        [t],
    );

    const onTabClick = useCallback(
        (tab: TabItem) => {
            onChangeType(tab.value as ReviewTypeEnums);
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
