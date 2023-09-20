import React, { memo } from 'react';
import { classNames } from '@/shared/libs/classNames/classNames';
import cls from './EditButton.module.scss';
import EditIcon from '@/shared/assets/ui/icons/edit.svg';
import { Icon } from '../../Icon';
import { HStack } from '@/shared/UI-kit/Stack';

interface EditButtonProps {
    className?: string;
    onEdit?: () => void;
}

export const EditButton = memo((props: EditButtonProps) => {
    const { className, onEdit } = props;

    const onClick = () => () => {
        if (onEdit) {
            onEdit();
        }
    };

    const commonProps = {
        className: classNames(cls.icon, {}, []),
        Svg: EditIcon,

        width: 24,
        height: 24,
        onClick: onClick(),
    };

    return (
        <HStack className={classNames(cls.EditButton, {}, [className])}>
            <Icon
                clickable={true}
                {...commonProps}
            />
        </HStack>
    );
});
