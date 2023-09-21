import React, { memo } from 'react';
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
