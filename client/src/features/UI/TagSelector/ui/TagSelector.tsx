import React, { memo, useCallback } from 'react';
import { classNames } from '@/shared/libs/classNames/classNames';
import { HStack, VStack } from '@/shared/UI-kit/Stack';
import { Text } from '@/shared/UI-kit/Text';
import { Combobox } from '@/shared/UI-kit/Popups';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import {
    getTagFormDataSelector,
    getTagListSelector,
    tagActions,
} from '@/entities/Tag';
import { useAppDispatch } from '@/shared/libs/hooks/useAppDispatch/useAppDispatch';

interface TagSelectorProps {
    className?: string;
}

export const TagSelector = memo((props: TagSelectorProps) => {
    const { className } = props;
    const { t } = useTranslation('tagSelector');
    const dispatch = useAppDispatch();
    const tagList = useSelector(getTagListSelector);

    const tagOptions: string[] = ['Durward', 'Kenton', 'Therese', 'Benedict'];

    const onChangeTag = useCallback((tag: string) => {
        dispatch(tagActions.addTag(tag));
    }, []);

    return (
        <HStack
            gap="8"
            className={classNames('', {}, [className])}
        >
            <Text text={t('select tag')} />
            <Combobox
                items={tagOptions}
                // value={tag}
                onAddValue={onChangeTag}
                className={className}
            />
        </HStack>
    );
});
