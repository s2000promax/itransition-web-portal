import React, { memo, useCallback, useEffect } from 'react';
import { classNames } from '@/shared/libs/classNames/classNames';
import cls from './ReviewTagSelector.module.scss';
import { VStack } from '@/shared/UI-kit/Stack';
import { Text } from '@/shared/UI-kit/Text';
import { Combobox } from '@/shared/UI-kit/Popups';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { fetchTagListService, getTagListSelector } from '@/entities/Tag';
import { useAppDispatch } from '@/shared/libs/hooks/useAppDispatch/useAppDispatch';
import { getTagsSearchSelector, uiActions } from '@/entities/UI/UI';
import { fetchReviewListService } from '@/entities/UI/ReviewListPage';
import { useDebounce } from '@/shared/libs/hooks/useDebounce/useDebounce';

interface ReviewTagSelectorProps {
    className?: string;
}

export const ReviewTagSelector = memo((props: ReviewTagSelectorProps) => {
    const { className } = props;
    const { t } = useTranslation('reviewList');
    const dispatch = useAppDispatch();
    const tagList = useSelector(getTagListSelector) || [];
    const tagFilter = useSelector(getTagsSearchSelector);

    useEffect(() => {
        dispatch(fetchTagListService());
    }, []);

    const fetchData = useCallback(() => {
        dispatch(fetchReviewListService({ replace: true }));
    }, [dispatch]);

    const debouncedFetchData = useDebounce(fetchData, 500);

    const onChangeTag = useCallback((tag: string) => {
        dispatch(uiActions.setTagsSearch(tag));
        debouncedFetchData();
    }, []);

    return (
        <VStack
            gap="8"
            className={classNames('', {}, [className])}
        >
            <Text text={t('tag_search')} />
            <Combobox
                items={tagList}
                onAddValue={onChangeTag}
                className={cls.input}
                doNotClean
                value={tagFilter}
                direction={'bottom right'}
            />
        </VStack>
    );
});
