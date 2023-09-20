import React, { memo, useCallback } from 'react';
import { classNames } from '@/shared/libs/classNames/classNames';
import cls from './TagsViewCard.module.scss';
import { useSelector } from 'react-redux';
import {
    getTagCurrentDataSelector,
    getTagFormDataSelector,
    tagActions,
} from '@/entities/Tag';
import { Card } from '@/shared/UI-kit/Card';
import { HStack } from '@/shared/UI-kit/Stack';
import { Tag } from '@/shared/UI-kit/Tag';
import { useAppDispatch } from '@/shared/libs/hooks/useAppDispatch/useAppDispatch';

interface TagsViewCardProps {
    className?: string;
}

export const TagsViewCard = memo((props: TagsViewCardProps) => {
    const { className } = props;
    const dispatch = useAppDispatch();
    const tags = useSelector(getTagCurrentDataSelector);

    const onTagDelete = useCallback(
        (tag: string) => {
            dispatch(tagActions.deleteTag(tag));
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
                <Tag
                    key={tag}
                    tagName={tag}
                    onDelete={onTagDelete}
                />
            ))}
        </HStack>
    );
});
