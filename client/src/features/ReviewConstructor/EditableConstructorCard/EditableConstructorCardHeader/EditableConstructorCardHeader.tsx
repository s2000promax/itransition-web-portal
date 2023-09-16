import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/libs/classNames/classNames';
import cls from './EditableConstructorCardHeader.module.scss';
import { useAppDispatch } from '@/shared/libs/hooks/useAppDispatch/useAppDispatch';
import { getUserDataSelector } from '@/entities/User';
import { HStack } from '@/shared/UI-kit/Stack';
import { Text } from '@/shared/UI-kit/Text';
import { Button } from '@/shared/UI-kit/Button';
import { Card } from '@/shared/UI-kit/Card';
import {
    createReviewService,
    getReviewFormReviewTypeSelector,
    getReviewFormSelector,
    getReviewReadonlySelector,
    reviewActions,
    ReviewBlockTypeEnums,
    ReviewCodeBlockI,
    ReviewI,
    ReviewImageBlockI,
    ReviewTextBlockI,
} from '@/entities/Review';
import { WorkI } from '@/entities/Work';
import { BackButton } from '@/shared/UI-kit/BackButton';
import { AddTextBlockButton } from '@/shared/UI-kit/AddTextBlockButton';
import { AddImageBlockButton } from '@/shared/UI-kit/AddImageBlockButton';
import { AddCodeBlockButton } from '@/shared/UI-kit/AddCodeBlockButton';

interface EditableProfileCardHeaderProps {
    className?: string;
    reviewData?: ReviewI;
    workData?: WorkI;
    ownerId?: string;
    isNewReview: boolean;
}

export const EditableConstructorCardHeader = memo(
    (props: EditableProfileCardHeaderProps) => {
        const { className, reviewData, workData, ownerId, isNewReview } = props;

        const { t } = useTranslation('reviewConstructor');
        const formData = useSelector(getReviewFormSelector);
        const currentUser = useSelector(getUserDataSelector);

        const canEdit = true; // authData?.id === profileData?.id;
        const readonly = useSelector(getReviewReadonlySelector);
        const dispatch = useAppDispatch();
        const reviewType = useSelector(getReviewFormReviewTypeSelector);

        const onEdit = useCallback(() => {
            dispatch(reviewActions.setReadonly(false));
            dispatch(
                reviewActions.updateFormReview({
                    workId: workData?.id,
                    ownerId: ownerId || currentUser?.id,
                    workTitle: workData?.title,
                    type: workData?.type,
                }),
            );
        }, [dispatch, workData]);

        const onCancelEdit = useCallback(() => {
            dispatch(reviewActions.cancelEdit());
        }, [dispatch]);

        const onSave = useCallback(() => {
            if (formData) {
                dispatch(createReviewService(formData));
            }
        }, [dispatch, formData]);

        const onAddTextBlock = useCallback(() => {
            const newTextBlock: ReviewTextBlockI = {
                sortId: 0,
                title: '',
                type: ReviewBlockTypeEnums.TEXT,
                paragraphs: [
                    {
                        sortId: 0,
                        content: '',
                    },
                ],
            };
            dispatch(reviewActions.addReviewBlock(newTextBlock));
        }, [dispatch]);

        const onAddImageBlock = useCallback(() => {
            const newImageBlock: ReviewImageBlockI = {
                sortId: 0,
                title: '',
                type: ReviewBlockTypeEnums.IMAGE,
                src: '',
            };
            dispatch(reviewActions.addReviewBlock(newImageBlock));
        }, [dispatch]);

        const onAddCodeBlock = useCallback(() => {
            const newCodeBlock: ReviewCodeBlockI = {
                sortId: 0,
                title: '',
                code: '',
                type: ReviewBlockTypeEnums.CODE,
            };
            dispatch(reviewActions.addReviewBlock(newCodeBlock));
        }, [dispatch]);

        return (
            <Card
                padding="24"
                fullWidth
                border="partial"
                className={classNames(cls.EditableConstructorCardHeader, {}, [
                    className,
                ])}
            >
                <BackButton className={cls.backButton} />
                <HStack
                    max
                    justify="between"
                    className={cls.header}
                >
                    <Text title={t('Create new review')} />
                    {canEdit && (
                        <div>
                            {readonly ? (
                                <Button onClick={onEdit}>{t('edit')}</Button>
                            ) : (
                                <HStack gap="8">
                                    <Button
                                        onClick={onCancelEdit}
                                        color="error"
                                    >
                                        {t('cancel')}
                                    </Button>
                                    <Button
                                        onClick={onSave}
                                        color="success"
                                    >
                                        {t('save')}
                                    </Button>
                                </HStack>
                            )}
                        </div>
                    )}
                </HStack>
                {!readonly && (
                    <HStack
                        max
                        justify="center"
                        className={cls.controlContainer}
                    >
                        <HStack
                            gap="16"
                            justify="center"
                        >
                            <AddTextBlockButton onAdd={onAddTextBlock} />
                            <AddImageBlockButton onAdd={onAddImageBlock} />
                            <AddCodeBlockButton onAdd={onAddCodeBlock} />
                        </HStack>
                    </HStack>
                )}
            </Card>
        );
    },
);
