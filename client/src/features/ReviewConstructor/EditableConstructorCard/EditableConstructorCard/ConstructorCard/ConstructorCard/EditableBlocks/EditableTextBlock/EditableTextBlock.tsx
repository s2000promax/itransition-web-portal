import React, { memo, useCallback } from 'react';
import { classNames } from '@/shared/libs/classNames/classNames';
import cls from './EditableTextBlock.module.scss';
import {
    getReviewReadonlySelector,
    reviewActions,
    ReviewTextBlockI,
} from '@/entities/Review';
import { useAppDispatch } from '@/shared/libs/hooks/useAppDispatch/useAppDispatch';
import { TextArea } from '@/shared/UI-kit/TextArea';
import { Input } from '@/shared/UI-kit/Input';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Button } from '@/shared/UI-kit/Button';
import { HStack, VStack } from '@/shared/UI-kit/Stack';
import AddParagraphIcon from '@/shared/assets/ui/icons/add.svg';
import DeleteBlockIcon from '@/shared/assets/ui/icons/delete.svg';
import { Icon } from '@/shared/UI-kit/Icon';

interface ReviewTextBlockComponentProps {
    className?: string;
    block: ReviewTextBlockI;
}

export const EditableTextBlock = memo(
    (props: ReviewTextBlockComponentProps) => {
        const { className, block } = props;
        const { t } = useTranslation('reviewEdit');
        const dispatch = useAppDispatch();
        const readonly = useSelector(getReviewReadonlySelector);

        const onDeleteBlock = useCallback(() => {
            dispatch(reviewActions.removeReviewBlock({ id: block.sortId }));
        }, [dispatch]);

        const onAddParagraph = useCallback(() => {
            dispatch(reviewActions.addTextParagraph({ id: block.sortId }));
        }, [dispatch]);

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

        const onChangeParagraph = useCallback(
            (index: number, value?: string) => {
                dispatch(
                    reviewActions.editTextParagraph({
                        sortId: block.sortId,
                        paragraphIndex: index,
                        content: value || '',
                    }),
                );
            },
            [dispatch],
        );

        return (
            <VStack
                className={classNames(cls.EditableTextBlock, {}, [className])}
                max
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
                        onClick={onAddParagraph}
                    >
                        <Icon
                            Svg={AddParagraphIcon}
                            className={cls.add}
                        />
                    </Button>
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
                    <Input
                        value={block.title}
                        placeholder={t('title')}
                        onChange={onChangeTitle}
                        readonly={readonly}
                        className={cls.title}
                    />
                    {block.paragraphs.map((paragraph, index) => (
                        <TextArea
                            key={`Block_${block.sortId}_${index}`}
                            value={paragraph.content}
                            placeholder={t('paragraph')}
                            onChange={(value) =>
                                onChangeParagraph(index, value)
                            }
                            readonly={readonly}
                            className={cls.paragraph}
                        />
                    ))}
                </VStack>
            </VStack>
        );
    },
);
