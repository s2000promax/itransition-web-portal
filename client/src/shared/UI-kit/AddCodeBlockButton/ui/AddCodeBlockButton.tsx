import React, { memo } from 'react';
import { classNames } from '@/shared/libs/classNames/classNames';
import cls from './AddCodeBlockButton.module.scss';
import CodeBlockIcon from '@/shared/assets/ui/icons/add-code.svg';
import { Icon } from '../../Icon';
import { HStack } from '@/shared/UI-kit/Stack';

interface AddCodeBlockButtonProps {
    className?: string;
    onAdd?: () => void;
}

export const AddCodeBlockButton = memo((props: AddCodeBlockButtonProps) => {
    const { className, onAdd } = props;

    const onClick = () => () => {
        if (onAdd) {
            onAdd();
        }
    };

    const commonProps = {
        className: classNames(cls.icon, {}, []),
        Svg: CodeBlockIcon,

        width: 30,
        height: 30,
        onClick: onClick(),
    };

    return (
        <HStack className={classNames(cls.AddCodeBlockButton, {}, [className])}>
            <Icon
                clickable={true}
                {...commonProps}
            />
        </HStack>
    );
});
