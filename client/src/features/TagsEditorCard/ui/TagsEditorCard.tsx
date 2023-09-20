import React, { memo, useCallback } from 'react';
import { classNames } from '@/shared/libs/classNames/classNames';
import cls from './TagsEditorCard.module.scss';
import { useSelector } from 'react-redux';
import { HStack } from '@/shared/UI-kit/Stack';
import { EditableTag } from '@/shared/UI-kit/EditableTag';
import { useAppDispatch } from '@/shared/libs/hooks/useAppDispatch/useAppDispatch';
import { getReviewFormTagsSelector, reviewActions } from '@/entities/Review';

interface TagsEditorCardProps {
    className?: string;
}

export const TagsEditorCard = memo((props: TagsEditorCardProps) => {
    const { className } = props;
    const dispatch = useAppDispatch();
    const tags = useSelector(getReviewFormTagsSelector);

    const onTagDelete = useCallback(
        (tag: string) => {
            dispatch(reviewActions.deleteTag(tag));
        },
        [dispatch],
    );

    if (!tags?.length) {
        return null;
    }

    return (
        <HStack
            className={classNames(cls.TagsViewCard, {}, [className])}
            gap="8"
            align="center"
            justify="center"
        >
            {tags.map((tag) => (
                <EditableTag
                    key={tag}
                    tagName={tag}
                    onDelete={onTagDelete}
                />
            ))}
        </HStack>
    );
});
