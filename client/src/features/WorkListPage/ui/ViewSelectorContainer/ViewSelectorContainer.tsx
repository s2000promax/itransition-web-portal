import { memo } from 'react';
import { useWorkFilters } from '../../libs/hooks/useWorkFilters';
import { ViewSelector } from '@/features/UI/ViewSelector';

interface ViewSelectorContainerProps {
    className?: string;
}

export const ViewSelectorContainer = memo(
    (props: ViewSelectorContainerProps) => {
        const { className } = props;
        const { view, onChangeView } = useWorkFilters();

        return (
            <ViewSelector
                className={className}
                view={view}
                onViewClick={onChangeView}
            />
        );
    },
);
