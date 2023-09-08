import React, { ReactNode, useMemo } from 'react';
import { classNames } from '@/shared/libs/classNames/classNames';
import cls from './TypeSelector.module.scss';
import { useTranslation } from 'react-i18next';
import { ReviewTypeEnums } from '@/entities/Review';
import { VStack } from '@/shared/UI-kit/Stack';
import { ListBox } from '@/shared/UI-kit/Popups';

interface TabItem {
    value: string;
    content: ReactNode;
}

interface TypeSelectorProps {
    className?: string;
    value: ReviewTypeEnums;
    onChangeType: (type: ReviewTypeEnums) => void;
}

export const TypeSelector = (props: TypeSelectorProps) => {
    const { className, value, onChangeType } = props;
    const { t } = useTranslation('review_types');

    const typeItems = useMemo<TabItem[]>(
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
                value: ReviewTypeEnums.GAMES,
                content: t('games'),
            },
            {
                value: ReviewTypeEnums.TECHNOLOGY,
                content: t('technology'),
            },
            {
                value: ReviewTypeEnums.STARTUPS,
                content: t('startups'),
            },
            {
                value: ReviewTypeEnums.SCIENCE,
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
