import { classNames } from '@/shared/libs/classNames/classNames';
import { VStack } from '@/shared/UI-kit/Stack';
import { Page } from '@/widgets/Page';
import { WorkDetailsContainer } from '@/features/WorkDetailsPage';

export interface WorkDetailsPageProps {
    className?: string;
}

const WorkDetailsPage = ({ className }: WorkDetailsPageProps) => {
    return (
        <Page
            data-testid="WorkDetailsPage"
            className={classNames('', {}, [className])}
        >
            <VStack
                gap="16"
                max
            >
                <WorkDetailsContainer />
            </VStack>
        </Page>
    );
};

export default WorkDetailsPage;
