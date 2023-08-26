import React from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/libs/classNames/classNames';
import cls from './ForbiddenPage.module.scss';

interface ForbiddenProps {
    className?: string;
}

export const ForbiddenPage = ({ className }: ForbiddenProps) => {
    const { t } = useTranslation('forbidden');

    return (
        <div
            className={classNames(cls.ForbiddenPage, {}, [className])}
            data-testid="ForbiddenPage"
        >
            {t('forbidden')}
        </div>
    );
};
