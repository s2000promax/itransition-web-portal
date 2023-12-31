import React, { memo, useCallback } from 'react';
import { classNames } from '@/shared/libs/classNames/classNames';
import cls from './TagsViewCard.module.scss';
import { useSelector } from 'react-redux';
import { HStack } from '@/shared/UI-kit/Stack';
import { useAppDispatch } from '@/shared/libs/hooks/useAppDispatch/useAppDispatch';
import { getReviewDataTagsSelector } from '@/entities/Review';
import { Tag } from '@/shared/UI-kit/Tag';
import { Card } from '@/shared/UI-kit/Card';
import { useNavigate } from 'react-router-dom';
import { AppRoutesEnums } from '@/shared/enums/router.enums';
import { uiActions } from '@/entities/UI/UI';

interface TagsViewCardProps {
    className?: string;
    readonly?: boolean;
}

export const TagsViewCard = memo((props: TagsViewCardProps) => {
    const { className, readonly } = props;
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const tags = useSelector(getReviewDataTagsSelector);

    const onClickTag = useCallback(
        (tag: string) => {
            dispatch(uiActions.setTagsSearch(tag));

            navigate(AppRoutesEnums.MAIN);
        },
        [dispatch],
    );

    if (!tags?.length) {
        return null;
    }

    return (
        <Card
            className={classNames(cls.TagsViewCard, {}, [className])}
            border="partial"
            padding="16"
        >
            <HStack
                gap="8"
                align="center"
                justify="center"
                className={cls.card}
            >
                {tags.map((tag) => (
                    <Tag
                        key={tag}
                        tagName={tag}
                        onClick={onClickTag}
                        readonly={readonly}
                    />
                ))}
            </HStack>
        </Card>
    );
});
