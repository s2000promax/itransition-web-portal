import React, { memo } from 'react';
import { classNames } from '@/shared/libs/classNames/classNames';
import { Dropdown } from '@/shared/UI-kit/Popups';
import { useAppDispatch } from '@/shared/libs/hooks/useAppDispatch/useAppDispatch';
import { LanguageInfoCard } from '@/features/UI/LanguageInfoCard';
import { languageChangeService } from '@/entities/UI/UI';
import { LanguageEnums } from '@/shared/enums/language.enums';
import { useInitialEffect } from '@/shared/libs/hooks/useInitialEffect/useInitialEffect';
import { PersistenceService } from '@/shared/services/persistence.service';
import { LocalStorageEnums } from '@/shared/enums/localStorage.enums';

interface LanguageDropdownProps {
    className?: string;
}

export const LanguageDropdown = memo((props: LanguageDropdownProps) => {
    const { className } = props;
    const dispatch = useAppDispatch();

    useInitialEffect(() => {
        const localLanguage = PersistenceService.get(
            LocalStorageEnums.LANGUAGE,
        );
        if (localLanguage) {
            dispatch(languageChangeService(localLanguage));
        }
    });

    const items = [
        {
            content: 'English',
            onClick: () => dispatch(languageChangeService(LanguageEnums.ENG)),
        },
        {
            content: 'Беларускі',
            onClick: () => dispatch(languageChangeService(LanguageEnums.BEL)),
        },
        {
            content: 'Polski',
            onClick: () => dispatch(languageChangeService(LanguageEnums.PL)),
        },
        {
            content: 'ქართული',
            onClick: () => dispatch(languageChangeService(LanguageEnums.GE)),
        },
        {
            content: 'Русский',
            onClick: () => dispatch(languageChangeService(LanguageEnums.RU)),
        },
    ];

    return (
        <Dropdown
            direction="top right"
            className={classNames('', {}, [className])}
            items={items}
            trigger={<LanguageInfoCard />}
        />
    );
});
