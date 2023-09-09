import React, { memo, useCallback } from 'react';
import { classNames } from '@/shared/libs/classNames/classNames';
import cls from './EditableCodeBlock.module.scss';
import DeleteBlockIcon from '@/shared/assets/ui/icons/delete.svg';
import { Icon } from '@/shared/UI-kit/Icon';

import {
    getReviewReadonlySelector,
    reviewActions,
    ReviewCodeBlockI,
} from '@/entities/Review';
import { useAppDispatch } from '@/shared/libs/hooks/useAppDispatch/useAppDispatch';
import { TextArea } from '@/shared/UI-kit/TextArea';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Input } from '@/shared/UI-kit/Input';
import { HStack, VStack } from '@/shared/UI-kit/Stack';
import { Button } from '@/shared/UI-kit/Button';

interface ReviewCodeBlockComponentProps {
    className?: string;
    block: ReviewCodeBlockI;
}

export const EditableCodeBlock = memo(
    (props: ReviewCodeBlockComponentProps) => {
        const { className, block } = props;
        const { t } = useTranslation('reviewEdit');
        const dispatch = useAppDispatch();
        const readonly = useSelector(getReviewReadonlySelector);

        const onDeleteBlock = useCallback(() => {
            dispatch(reviewActions.removeReviewBlock({ id: block.sortId }));
        }, [dispatch]);

        const onChangeCode = useCallback(
            (value?: string) => {
                dispatch(
                    reviewActions.editCodeBlock({
                        sortId: block.sortId,
                        code: value || '',
                    }),
                );
            },
            [dispatch],
        );

        const onChangeTitle = useCallback(
            (value?: string) => {
                dispatch(
                    reviewActions.editBlockTitle({
                        sortId: block.sortId,
                        title: value || '',
                    }),
                );
            },
            [dispatch],
        );

        return (
            <VStack
                max
                className={classNames(cls.EditableCodeBlock, {}, [className])}
            >
                <HStack
                    gap="8"
                    max
                    justify="end"
                    className={cls.control}
                >
                    <Button
                        variant="clear"
                        disabled={readonly}
                        onClick={onDeleteBlock}
                    >
                        <Icon
                            Svg={DeleteBlockIcon}
                            className={cls.delete}
                        />
                    </Button>
                </HStack>
                <VStack
                    max
                    gap="16"
                >
                    <TextArea
                        value={block.code}
                        placeholder={t('code')}
                        onChange={onChangeCode}
                        readonly={readonly}
                    />
                    <Input
                        value={block.title}
                        placeholder={t('code description')}
                        onChange={onChangeTitle}
                        readonly={readonly}
                        className={cls.description}
                    />
                </VStack>
            </VStack>
        );
    },
);
