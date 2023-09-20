import React, { memo } from 'react';
import { classNames } from '@/shared/libs/classNames/classNames';
import cls from './EditableTag.module.scss';
import { HStack } from '@/shared/UI-kit/Stack';
import { Icon } from '@/shared/UI-kit/Icon';
import DeleteCrossIcon from '@/shared/assets/ui/icons/delete-cross.svg';
import { Text } from '@/shared/UI-kit/Text';

interface EditableTagProps {
    className?: string;
    tagName: string;
    onDelete: (value: string) => void;
}

export const EditableTag = memo((props: EditableTagProps) => {
    const { className, tagName, onDelete } = props;

    const onClick = () => () => {
        onDelete(tagName);
    };

    const commonProps = {
        className: classNames(cls.icon, {}, []),
        Svg: DeleteCrossIcon,

        width: 15,
        height: 15,
        onClick: onClick(),
    };

    if (!tagName) {
        return null;
    }

    return (
        <HStack
            justify="between"
            align="center"
            className={classNames(cls.Tag, {}, [className])}
        >
            <Text
                text={tagName}
                bold
                className={cls.tag}
            />
            <Icon
                clickable={true}
                {...commonProps}
            />
        </HStack>
    );
});
