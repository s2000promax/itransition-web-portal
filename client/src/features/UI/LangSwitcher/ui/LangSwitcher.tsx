import { useTranslation } from 'react-i18next';
import React, { memo } from 'react';

import { Button } from '@/shared/UI-kit/Button';

interface LangSwitcherProps {
    className?: string;
    short?: boolean;
}

export const LangSwitcher = memo(({ className, short }: LangSwitcherProps) => {
    const { t, i18n } = useTranslation();

    const toggle = async () => {
        await i18n.changeLanguage(i18n.language === 'en' ? 'ru' : 'en');
    };

    return (
        <Button
            onClick={toggle}
            variant="clear"
        >
            {t(short ? 'Lang' : 'Language')}
        </Button>
    );
});
