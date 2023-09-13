import { useParams } from 'react-router-dom';
import { classNames } from '@/shared/libs/classNames/classNames';
import { VStack } from '@/shared/UI-kit/Stack';
import { Page } from '@/widgets/Page';
import { EditableProfileCard } from '@/features/Profile/EditableProfileCard';

export interface WorkDetailsPageProps {
    className?: string;
}

const WorkDetailsPage = ({ className }: WorkDetailsPageProps) => {
    const { id } = useParams<{ id: string }>();

    return (
        <Page
            data-testid="WorkDetailsPage"
            className={classNames('', {}, [className])}
        >
            <VStack
                gap="16"
                max
            >
                <p>WORK DETAILS PAGE</p>
            </VStack>
        </Page>
    );
};

export default WorkDetailsPage;
