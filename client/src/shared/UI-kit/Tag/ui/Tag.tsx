import React, { memo } from 'react';
import { classNames } from '@/shared/libs/classNames/classNames';
import cls from './Tag.module.scss';
import { HStack } from '@/shared/UI-kit/Stack';
import { Icon } from '@/shared/UI-kit/Icon';
import DeleteCrossIcon from '@/shared/assets/ui/icons/delete-cross.svg';
import { Text } from '@/shared/UI-kit/Text';
import { Button } from '@/shared/UI-kit/Button';

interface EditableTagProps {
    className?: string;
    tagName: string;
    onClick: (value: string) => void;
}

export const Tag = memo((props: EditableTagProps) => {
    const { className, tagName, onClick } = props;

    const handleClick = (tag: string) => {
        onClick(tag);
    };

    if (!tagName) {
        return null;
    }

    return (
        <Button
            className={className}
            variant="filled"
            onClick={() => handleClick(tagName)}
        >
            <Text
                text={tagName}
                bold
            />
        </Button>
    );
});
