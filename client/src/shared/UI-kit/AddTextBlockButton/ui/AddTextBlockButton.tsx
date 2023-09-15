import React, { memo } from 'react';
import { classNames } from '@/shared/libs/classNames/classNames';
import cls from './AddTextBlockButton.module.scss';
import TextBlockIcon from '@/shared/assets/ui/icons/add-text.svg';
import { Icon } from '../../Icon';
import { HStack } from '@/shared/UI-kit/Stack';

interface AddTextBlockButtonProps {
    className?: string;
    onAdd?: () => void;
}

export const AddTextBlockButton = memo((props: AddTextBlockButtonProps) => {
    const { className, onAdd } = props;

    const onClick = () => () => {
        if (onAdd) {
            onAdd();
        }
    };

    const commonProps = {
        className: classNames(cls.icon, {}, []),
        Svg: TextBlockIcon,

        width: 32,
        height: 32,
        onClick: onClick(),
    };

    return (
        <HStack className={classNames(cls.AddTextBlockButton, {}, [className])}>
            <Icon
                clickable={true}
                {...commonProps}
            />
        </HStack>
    );
});
