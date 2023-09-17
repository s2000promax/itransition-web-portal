import { classNames } from '@/shared/libs/classNames/classNames';
import cls from './WorkDetailsPage.module.scss';
import { Page } from '@/widgets/Page';
import { WorkDetailsContainer } from '@/features/WorkDetailsPage';
import { memo } from 'react';

export interface WorkDetailsPageProps {
    className?: string;
}

const WorkDetailsPage = ({ className }: WorkDetailsPageProps) => {
    return (
        <Page
            data-testid="WorkDetailsPage"
            className={classNames(cls.WorkDetailsPage, {}, [className])}
        >
            <WorkDetailsContainer />
        </Page>
    );
};

export default memo(WorkDetailsPage);
