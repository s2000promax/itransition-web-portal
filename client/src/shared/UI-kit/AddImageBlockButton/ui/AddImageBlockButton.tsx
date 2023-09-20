import React, { memo } from 'react';
import { classNames } from '@/shared/libs/classNames/classNames';
import cls from './AddImageBlockButton.module.scss';
import ImageBlockIcon from '@/shared/assets/ui/icons/add-image.svg';
import { Icon } from '../../Icon';
import { HStack } from '@/shared/UI-kit/Stack';

interface AddImageBlockButtonProps {
    className?: string;
    onAdd?: () => void;
}

export const AddImageBlockButton = memo((props: AddImageBlockButtonProps) => {
    const { className, onAdd } = props;

    const onClick = () => () => {
        if (onAdd) {
            onAdd();
        }
    };

    const commonProps = {
        className: classNames(cls.icon, {}, []),
        Svg: ImageBlockIcon,

        width: 32,
        height: 32,
        onClick: onClick(),
    };

    return (
        <HStack
            className={classNames(cls.AddImageBlockButton, {}, [className])}
        >
            <Icon
                clickable={true}
                {...commonProps}
            />
        </HStack>
    );
});
