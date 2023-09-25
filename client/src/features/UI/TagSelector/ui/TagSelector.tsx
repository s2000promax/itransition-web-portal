import React, { memo, useCallback } from 'react';
import { classNames } from '@/shared/libs/classNames/classNames';
import { HStack } from '@/shared/UI-kit/Stack';
import { Text } from '@/shared/UI-kit/Text';
import { Combobox } from '@/shared/UI-kit/Popups';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getTagListSelector } from '@/entities/Tag';
import { useAppDispatch } from '@/shared/libs/hooks/useAppDispatch/useAppDispatch';
import { reviewActions } from '@/entities/Review';

interface TagSelectorProps {
    className?: string;
}

export const TagSelector = memo((props: TagSelectorProps) => {
    const { className } = props;
    const { t } = useTranslation('filters');
    const dispatch = useAppDispatch();
    const tagList = useSelector(getTagListSelector) || [];

    const onChangeTag = useCallback((tag: string) => {
        dispatch(reviewActions.addTag(tag));
    }, []);

    return (
        <HStack
            gap="8"
            className={classNames('', {}, [className])}
        >
            <Text text={t('select')} />
            <Combobox
                items={tagList}
                onAddValue={onChangeTag}
                className={className}
                direction={'bottom left'}
            />
        </HStack>
    );
});
