import React, { memo, useState } from 'react';
import { Text } from '@/shared/UI-kit/Text';
import { FileUploader } from 'react-drag-drop-files';
import { VStack } from '@/shared/UI-kit/Stack';
import { useTranslation } from 'react-i18next';

interface ImageDragDropUploaderProps {
    className?: string;
    onUpload: (file: File) => void;
}

export const ImageDragDropUploader = memo(
    (props: ImageDragDropUploaderProps) => {
        const { className, onUpload } = props;
        const { t } = useTranslation('imageUploader');

        const fileTypes = ['JPG', 'PNG', 'GIF', 'JPEG'];

        const [file, setFile] = useState<File | null>(null);

        const handleChange = (file: File) => {
            setFile(file);
            onUpload(file);
        };

        return (
            <VStack
                max
                align="center"
                gap="8"
                className={className}
            >
                <Text text={t('upload your image')} />
                <FileUploader
                    multiple={false}
                    handleChange={handleChange}
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
        );
    },
);
