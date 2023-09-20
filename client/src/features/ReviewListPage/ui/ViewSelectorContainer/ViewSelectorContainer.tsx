import { memo } from 'react';
import { useReviewFilters } from '../../libs/hooks/useReviewFilters';
import { ViewSelector } from '@/features/UI/ViewSelector';

interface ViewSelectorContainerProps {
    className?: string;
}

export const ViewSelectorContainer = memo(
    (props: ViewSelectorContainerProps) => {
        const { className } = props;
        const { view, onChangeView } = useReviewFilters();

        return (
            <ViewSelector
                className={className}
                view={view}
                onViewClick={onChangeView}
            />
        );
    },
);
