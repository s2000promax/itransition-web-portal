import React from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/libs/classNames/classNames';
import cls from './ForbiddenPage.module.scss';

interface ForbiddenProps {
    className?: string;
}

export const ForbiddenPage = ({ className }: ForbiddenProps) => {
    const { t } = useTranslation('forbiddenPage');

    return (
        <div
            className={classNames(cls.ForbiddenPage, {}, [className])}
            data-testid="ForbiddenPage"
        >
            {t('message')}
        </div>
    );
};
