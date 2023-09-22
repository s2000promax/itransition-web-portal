import React, { memo } from 'react';
import { Text } from '@/shared/UI-kit/Text';
import { Button } from '@/shared/UI-kit/Button';

interface EditableTagProps {
    className?: string;
    tagName: string;
    onClick: (value: string) => void;
    readonly?: boolean;
}

export const Tag = memo((props: EditableTagProps) => {
    const { className, tagName, onClick, readonly } = props;

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
            disabled={readonly}
        >
            <Text
                text={tagName}
                bold
            />
        </Button>
    );
});
