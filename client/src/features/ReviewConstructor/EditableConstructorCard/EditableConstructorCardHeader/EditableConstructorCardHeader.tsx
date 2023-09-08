import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/libs/classNames/classNames';
import cls from './EditableConstructorCardHeader.module.scss';
import { useAppDispatch } from '@/shared/libs/hooks/useAppDispatch/useAppDispatch';
import { getUserDataSelector } from '@/entities/User';
import { getProfileData } from '@/entities/Profile';
import { HStack, VStack } from '@/shared/UI-kit/Stack';
import { Text } from '@/shared/UI-kit/Text';
import { Button } from '@/shared/UI-kit/Button';
import { Card } from '@/shared/UI-kit/Card';
import AddTextBlockIcon from '@/shared/assets/ui/icons/add-text.svg';
import AddImageBlockIcon from '@/shared/assets/ui/icons/add-image.svg';
import AddCodeBlockIcon from '@/shared/assets/ui/icons/add-code.svg';
import { Icon } from '@/shared/UI-kit/Icon';
import {
    getReviewFormReviewTypeSelector,
    getReviewReadonlySelector,
    reviewActions,
    ReviewBlockTypeEnums,
    ReviewCodeBlockI,
    ReviewImageBlockI,
    ReviewTextBlockI,
    ReviewTypeEnums,
} from '@/entities/Review';
import { TypeSelector } from '@/features/UI/TypeSelector';

interface EditableProfileCardHeaderProps {
    className?: string;
}

export const EditableConstructorCardHeader = memo(
    (props: EditableProfileCardHeaderProps) => {
        const { className } = props;

        const { t } = useTranslation('profile');
        const authData = useSelector(getUserDataSelector);
        const profileData = useSelector(getProfileData);
        const canEdit = true; // authData?.id === profileData?.id;
        const readonly = useSelector(getReviewReadonlySelector);
        const dispatch = useAppDispatch();
        const reviewType = useSelector(getReviewFormReviewTypeSelector);

        const onEdit = useCallback(() => {
            dispatch(reviewActions.setReadonly(false));
        }, [dispatch]);

        const onCancelEdit = useCallback(() => {
            dispatch(reviewActions.cancelEdit());
        }, [dispatch]);

        const onSave = useCallback(() => {
            // dispatch(updateProfileData());
        }, [dispatch]);

        const onAddTextBlock = useCallback(() => {
            const newTextBlock: ReviewTextBlockI = {
                id: '',
                title: '',
                type: ReviewBlockTypeEnums.TEXT,
                paragraphs: [''],
            };
            dispatch(reviewActions.addReviewBlock(newTextBlock));
        }, [dispatch]);

        const onAddImageBlock = useCallback(() => {
            const newImageBlock: ReviewImageBlockI = {
                id: '',
                title: '',
                type: ReviewBlockTypeEnums.IMAGE,
                src: '',
            };
            dispatch(reviewActions.addReviewBlock(newImageBlock));
        }, [dispatch]);

        const onAddCodeBlock = useCallback(() => {
            const newCodeBlock: ReviewCodeBlockI = {
                id: '',
                title: '',
                code: '',
                type: ReviewBlockTypeEnums.CODE,
            };
            dispatch(reviewActions.addReviewBlock(newCodeBlock));
        }, [dispatch]);

        const onReviewTypeChange = useCallback(
            (type: ReviewTypeEnums) => {
                dispatch(reviewActions.updateFormReview({ type }));
            },
            [dispatch],
        );

        return (
            <Card
                padding="24"
                fullWidth
                border="partial"
            >
                <HStack
                    max
                    justify="between"
                    className={classNames('', {}, [className])}
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
                        justify="between"
                        className={cls.controlContainer}
                    >
                        <HStack
                            gap="16"
                            justify="center"
                        >
                            <Button
                                variant="clear"
                                onClick={onAddTextBlock}
                            >
                                <Icon Svg={AddTextBlockIcon} />
                            </Button>
                            <Button
                                variant="clear"
                                onClick={onAddImageBlock}
                            >
                                <Icon Svg={AddImageBlockIcon} />
                            </Button>
                            <Button
                                variant="clear"
                                onClick={onAddCodeBlock}
                            >
                                <Icon Svg={AddCodeBlockIcon} />
                            </Button>
                        </HStack>
                        <HStack>
                            <TypeSelector
                                value={reviewType}
                                onChangeType={onReviewTypeChange}
                            />
                        </HStack>
                    </HStack>
                )}
            </Card>
        );
    },
);
