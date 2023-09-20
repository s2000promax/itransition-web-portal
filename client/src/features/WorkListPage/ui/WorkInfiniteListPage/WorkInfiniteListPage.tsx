import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { Text } from '@/shared/UI-kit/Text';
import { WorkList } from '@/features/WorkList';
import {
    getWorkListPage,
    getWorkListPageErrorSelector,
    getWorkListPageIsLoadingSelector,
    getWorkListPageViewSelector,
} from '@/entities/UI/WorkListPage';

interface ReviewInfiniteListProps {
    className?: string;
}

export const WorkInfiniteListPage = memo((props: ReviewInfiniteListProps) => {
    const { className } = props;
    const workList = useSelector(getWorkListPage.selectAll);
    const isLoading = useSelector(getWorkListPageIsLoadingSelector);
    const view = useSelector(getWorkListPageViewSelector);
    const error = useSelector(getWorkListPageErrorSelector);
    const { t } = useTranslation('workListPage');

    if (error) {
        return (
            <Text
                size="l"
                text={t('An error occurred while loading the works')}
            />
        );
    }

    return (
        <WorkList
            isLoading={isLoading}
            view={view}
            workList={workList}
            className={className}
        />
    );
});
