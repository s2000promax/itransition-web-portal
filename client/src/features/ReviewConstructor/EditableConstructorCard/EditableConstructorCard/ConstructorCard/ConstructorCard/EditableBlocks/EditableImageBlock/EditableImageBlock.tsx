import React, { memo, useCallback, useEffect, useState } from 'react';
import { classNames } from '@/shared/libs/classNames/classNames';
import cls from './EditableImageBlock.module.scss';
import { Text } from '@/shared/UI-kit/Text';
import {
    getReviewReadonlySelector,
    reviewActions,
    ReviewImageBlockI,
} from '@/entities/Review';
import { useAppDispatch } from '@/shared/libs/hooks/useAppDispatch/useAppDispatch';
import { AppImage } from '@/shared/UI-kit/AppImage';
import { FileUploader } from 'react-drag-drop-files';
import { Input } from '@/shared/UI-kit/Input';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { uploadService } from '@/entities/Upload';
import DeleteBlockIcon from '@/shared/assets/ui/icons/delete.svg';
import { Icon } from '@/shared/UI-kit/Icon';
import { Button } from '@/shared/UI-kit/Button';
import { HStack, VStack } from '@/shared/UI-kit/Stack';

interface ReviewImageBlockComponentProps {
    className?: string;
    block: ReviewImageBlockI;
}

export const EditableImageBlock = memo(
    (props: ReviewImageBlockComponentProps) => {
        const { className, block } = props;
        const { t } = useTranslation('reviewEdit');
        const dispatch = useAppDispatch();
        const readonly = useSelector(getReviewReadonlySelector);

        const [file, setFile] = useState<File | null>(null);

        const handleFileUploaderChange = (file: File) => {
            setFile(file);
            dispatch(uploadService(file)).then((response) => {
                if (response.meta.requestStatus === 'fulfilled') {
                    const url = Object.values(
                        response.payload as { url: string },
                    ).join();

                    dispatch(
                        reviewActions.editImageBlock({
                            blockId: block.id,
                            src: url,
                        }),
                    );
                }
            });
        };

        useEffect(() => {
            if (file) {
                // dispatch(uploadService(file));
            }
        }, [file, dispatch]);

        const fileTypes = ['JPG', 'PNG', 'GIF', 'JPEG'];

        const onDeleteBlock = useCallback(() => {
            dispatch(reviewActions.removeReviewBlock({ id: block.id }));
        }, [dispatch]);

        const onChangeTitle = useCallback(
            (value?: string) => {
                dispatch(
                    reviewActions.editBlockTitle({
                        blockId: block.id,
                        title: value || '',
                    }),
                );
            },
            [dispatch],
        );

        return (
            <VStack
                max
                align="center"
                className={classNames(cls.EditableImageBlock, {}, [className])}
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
                {block.src && (
                    <AppImage
                        src={block.src}
                        alt={block.src}
                        className={cls.image}
                    />
                )}
                <Input
                    value={block.title}
                    placeholder={t('image description')}
                    onChange={onChangeTitle}
                    readonly={readonly}
                    className={cls.description}
                />

                {!readonly && (
                    <VStack
                        max
                        align="center"
                        gap="8"
                    >
                        <Text text={t('upload your image')} />
                        <FileUploader
                            multiple={false}
                            handleChange={handleFileUploaderChange}
                            name="file"
                            types={fileTypes}
                        />
                        <Text
                            text={
                                file
                                    ? `File name: ${file.name}`
                                    : t('no files uploaded yet')
                            }
                        />
                    </VStack>
                )}
            </VStack>
        );
    },
);
