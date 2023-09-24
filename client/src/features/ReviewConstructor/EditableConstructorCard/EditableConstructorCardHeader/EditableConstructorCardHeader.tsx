import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/libs/classNames/classNames';
import cls from './EditableConstructorCardHeader.module.scss';
import { useAppDispatch } from '@/shared/libs/hooks/useAppDispatch/useAppDispatch';
import { getUserDataSelector, isUserRoleAdminSelector } from '@/entities/User';
import { HStack } from '@/shared/UI-kit/Stack';
import { Text } from '@/shared/UI-kit/Text';
import { Button } from '@/shared/UI-kit/Button';
import { Card } from '@/shared/UI-kit/Card';
import {
    createReviewService,
    getReviewFormSelector,
    getReviewReadonlySelector,
    reviewActions,
    ReviewBlockTypeEnums,
    ReviewCodeBlockI,
    ReviewI,
    ReviewImageBlockI,
    ReviewTextBlockI,
    updateReviewService,
} from '@/entities/Review';
import { WorkI } from '@/entities/Work';
import { BackButton } from '@/shared/UI-kit/BackButton';
import { AddTextBlockButton } from '@/shared/UI-kit/AddTextBlockButton';
import { AddImageBlockButton } from '@/shared/UI-kit/AddImageBlockButton';
import { AddCodeBlockButton } from '@/shared/UI-kit/AddCodeBlockButton';
import { fetchTagListService } from '@/entities/Tag';
import { getRouteReviewList } from '@/shared/routes/routes.patterns';
import { useNavigate } from 'react-router-dom';

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
        const formReviewData = useSelector(getReviewFormSelector);
        const currentUser = useSelector(getUserDataSelector);
        const isUserAdmin = useSelector(isUserRoleAdminSelector);
        const canEdit = reviewData
            ? reviewData?.ownerId === currentUser?.id || isUserAdmin
            : !!currentUser;
        const readonly = useSelector(getReviewReadonlySelector);
        const dispatch = useAppDispatch();
        const navigate = useNavigate();

        const onEdit = useCallback(() => {
            if (isNewReview) {
                dispatch(reviewActions.setReadonly(false));
                dispatch(
                    reviewActions.updateFormReview({
                        workId: workData?.id,
                        ownerId: ownerId || currentUser?.id,
                        workTitle: workData?.title,
                        type: workData?.type,
                        ownerRating: 0,
                    }),
                );
            } else {
                dispatch(reviewActions.updateFormReview(reviewData!));
                dispatch(reviewActions.setReadonly(false));
            }

            dispatch(fetchTagListService());
        }, [dispatch, workData, reviewData]);

        const onCancelEdit = useCallback(() => {
            dispatch(reviewActions.cancelEdit());
        }, [dispatch]);

        const onSave = useCallback(() => {
            if (formReviewData) {
                if (isNewReview) {
                    dispatch(createReviewService(formReviewData)).then(
                        (response) => {
                            if (response.meta.requestStatus === 'fulfilled') {
                                navigate(getRouteReviewList());
                            }
                        },
                    );
                } else {
                    dispatch(updateReviewService(formReviewData));
                }
            }
        }, [dispatch, formReviewData]);

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

        if (isNewReview) {
            return (
                <Card
                    padding="24"
                    fullWidth
                    border="partial"
                    className={classNames(
                        cls.EditableConstructorCardHeader,
                        {},
                        [className],
                    )}
                >
                    <BackButton className={cls.backButton} />
                    <HStack
                        max
                        justify="between"
                        className={cls.header}
                    >
                        <Text title={t('create')} />

                        {canEdit && (
                            <div>
                                {readonly ? (
                                    <Button onClick={onEdit}>
                                        {t('create')}
                                    </Button>
                                ) : (
                                    <HStack gap="8">
                                        <Button
                                            onClick={onCancelEdit}
                                            color="error"
                                        >
                                            {t('Cancel')}
                                        </Button>
                                        <Button
                                            onClick={onSave}
                                            color="success"
                                        >
                                            {t('Save')}
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
        } else {
            return (
                <Card
                    padding="24"
                    fullWidth
                    border="partial"
                    className={classNames(
                        cls.EditableConstructorCardHeader,
                        {},
                        [className],
                    )}
                >
                    <BackButton className={cls.backButton} />
                    <HStack
                        max
                        justify="between"
                        className={cls.header}
                    >
                        <HStack gap="8">
                            <Text title={t('Edit')} />
                            <Text title={reviewData?.title} />
                        </HStack>

                        {canEdit && (
                            <div>
                                {readonly ? (
                                    <Button onClick={onEdit}>
                                        {t('Edit')}
                                    </Button>
                                ) : (
                                    <HStack gap="8">
                                        <Button
                                            onClick={onCancelEdit}
                                            color="error"
                                        >
                                            {t('Cancel')}
                                        </Button>
                                        <Button
                                            onClick={onSave}
                                            color="success"
                                        >
                                            {t('Save')}
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
        }
    },
);
