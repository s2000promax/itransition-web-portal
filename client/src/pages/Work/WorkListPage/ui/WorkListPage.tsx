import { useParams } from 'react-router-dom';
import { classNames } from '@/shared/libs/classNames/classNames';
import { VStack } from '@/shared/UI-kit/Stack';
import { Page } from '@/widgets/Page';

export interface WorkListPageProps {
    className?: string;
}

const WorkListPage = ({ className }: WorkListPageProps) => {
    const { id } = useParams<{ id: string }>();

    return (
        <Page
            data-testid="WorkListPage"
            className={classNames('', {}, [className])}
        >
            <VStack
                gap="16"
                max
            >
                <p>WORK LIST PAGE</p>
            </VStack>
        </Page>
    );
};

export default WorkListPage;
