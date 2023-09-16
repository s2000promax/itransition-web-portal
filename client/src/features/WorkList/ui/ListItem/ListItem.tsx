import { HTMLAttributeAnchorTarget, memo } from 'react';
import { WorkI } from '@/entities/Work';
import { WorkInfoCard } from '@/features/WorkInfoCard';
import { ViewEnums } from '@/entities/UI/UI';

interface ListItemProps {
    className?: string;
    work?: WorkI;
    view: ViewEnums;
    target?: HTMLAttributeAnchorTarget;
}

export const ListItem = memo((props: ListItemProps) => {
    const { className, work, view, target } = props;

    return (
        <WorkInfoCard
            work={work}
            className={className}
        />
    );
});
