import React, { ReactNode, useMemo } from 'react';
import { classNames } from '@/shared/libs/classNames/classNames';
import cls from './TypeSelector.module.scss';
import { useTranslation } from 'react-i18next';
import { VStack } from '@/shared/UI-kit/Stack';
import { ListBox } from '@/shared/UI-kit/Popups';
import { WorkTypeEnums } from '@/entities/Work';

interface TabItem {
    value: string;
    content: ReactNode;
}

interface TypeSelectorProps {
    className?: string;
    value: WorkTypeEnums;
    onChangeType: (type: WorkTypeEnums) => void;
}

export const TypeSelector = (props: TypeSelectorProps) => {
    const { className, value, onChangeType } = props;
    const { t } = useTranslation('ui');

    const typeItems = useMemo<TabItem[]>(
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
                value: WorkTypeEnums.GAMES,
                content: t('games'),
            },
            {
                value: WorkTypeEnums.TECHNOLOGY,
                content: t('technology'),
            },
            {
                value: WorkTypeEnums.STARTUPS,
                content: t('startups'),
            },
            {
                value: WorkTypeEnums.SCIENCE,
                content: t('science'),
            },
        ],
        [t],
    );

    return (
        <VStack className={classNames(cls.$ClassName, {}, [className])}>
            <ListBox
                items={typeItems}
                value={value}
                onChange={onChangeType}
            />
        </VStack>
    );
};
