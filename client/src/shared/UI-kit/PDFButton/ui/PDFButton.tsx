import React, { memo } from 'react';
import { classNames } from '@/shared/libs/classNames/classNames';
import cls from './PDFButton.module.scss';
import PDFIcon from '@/shared/assets/ui/icons/pdf.svg';
import { Icon } from '../../Icon';
import { HStack } from '@/shared/UI-kit/Stack';

interface PDFButtonProps {
    className?: string;
    onExportToPDF?: () => void;
}

export const PDFButton = memo((props: PDFButtonProps) => {
    const { className, onExportToPDF } = props;

    const onClick = () => () => {
        if (onExportToPDF) {
            onExportToPDF();
        }
    };

    const commonProps = {
        className: classNames(cls.icon, {}, []),
        Svg: PDFIcon,

        width: 26,
        height: 24,
        onClick: onClick(),
    };

    return (
        <HStack className={classNames(cls.PDFButton, {}, [className])}>
            <Icon
                clickable={true}
                {...commonProps}
            />
        </HStack>
    );
});
