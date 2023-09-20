import { useTranslation } from 'react-i18next';
import { memo, useEffect, useState } from 'react';
import { useAppDispatch } from '@/shared/libs/hooks/useAppDispatch/useAppDispatch';
import { isMobile } from 'react-device-detect';
import { Modal } from '@/shared/UI-kit/Modal';
import { Text } from '@/shared/UI-kit/Text';
import { Drawer } from '@/shared/UI-kit/Drawer';
import { useUserSettings } from '@/entities/User';
import { PersistenceService } from '@/shared/services/persistence.service';
import { LocalStorageEnums } from '@/shared/enums/localStorage.enums';

export const Greeting = memo(() => {
    const { t } = useTranslation('greeting');
    const [isOpen, setIsOpen] = useState(false);
    const { isReviewsPageWasOpened } = useUserSettings();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!isReviewsPageWasOpened) {
            setIsOpen(true);
        }
    }, [dispatch, isReviewsPageWasOpened]);

    const onClose = () => {
        setIsOpen(false);
        PersistenceService.set(LocalStorageEnums.IS_REVIEW_PAGE_WAS_OPEN, true);
    };

    const text = (
        <Text
            title={t('Welcome to Reviews Page')}
            text={t('Here you can search and view reviews on various topics')}
        />
    );

    if (isMobile) {
        return (
            <Drawer
                lazy
                isOpen={isOpen}
                onClose={onClose}
            >
                {text}
            </Drawer>
        );
    }

    return (
        <Modal
            lazy
            isOpen={isOpen}
            onClose={onClose}
        >
            {text}
        </Modal>
    );
});
