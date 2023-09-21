import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/libs/classNames/classNames';
import cls from './EditableWorkCardHeader.module.scss';
import { useAppDispatch } from '@/shared/libs/hooks/useAppDispatch/useAppDispatch';
import { getUserDataSelector } from '@/entities/User';
import { HStack } from '@/shared/UI-kit/Stack';
import { Text } from '@/shared/UI-kit/Text';
import { Button } from '@/shared/UI-kit/Button';
import { Card } from '@/shared/UI-kit/Card';
import {
    getWorkReadonlySelector,
    updateWorkDataService,
    workActions,
} from '@/entities/Work';
import { BackButton } from '@/shared/UI-kit/BackButton';

interface EditableWorkCardHeaderProps {
    className?: string;
}

export const EditableWorkCardHeader = memo(
    (props: EditableWorkCardHeaderProps) => {
        const { className } = props;

        const { t } = useTranslation('work');
        const authData = useSelector(getUserDataSelector);
        const canEdit = true; // TODO Can Edit Admin, SA
        const readonly = useSelector(getWorkReadonlySelector);
        const dispatch = useAppDispatch();

        const onEdit = useCallback(() => {
            dispatch(workActions.setReadonly(false));
        }, [dispatch]);

        const onCancelEdit = useCallback(() => {
            dispatch(workActions.cancelEdit());
        }, [dispatch]);

        const onSave = useCallback(() => {
            dispatch(updateWorkDataService());
        }, [dispatch]);

        return (
            <Card
                padding="24"
                fullWidth
                border="partial"
                className={classNames(cls.EditableWorkCardHeader, {}, [
                    className,
                ])}
            >
                <BackButton className={cls.backButton} />
                <HStack
                    max
                    justify="between"
                    className={cls.header}
                >
                    <Text title={t('Works')} />
                    {canEdit && (
                        <div>
                            {readonly ? (
                                <Button
                                    onClick={onEdit}
                                    data-testid="EditableProfileCardHeader.EditButton"
                                >
                                    {t('Edit')}
                                </Button>
                            ) : (
                                <HStack gap="8">
                                    <Button
                                        onClick={onCancelEdit}
                                        data-testid="EditableWorkCardHeader.CancelButton"
                                        color="error"
                                    >
                                        {t('Cancel')}
                                    </Button>
                                    <Button
                                        onClick={onSave}
                                        data-testid="EditableWorkCardHeader.SaveButton"
                                        color="success"
                                    >
                                        {t('Save')}
                                    </Button>
                                </HStack>
                            )}
                        </div>
                    )}
                </HStack>
            </Card>
        );
    },
);
