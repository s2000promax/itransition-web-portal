import { useParams } from 'react-router-dom';
import { classNames } from '@/shared/libs/classNames/classNames';
import { VStack } from '@/shared/UI-kit/Stack';
import { Page } from '@/widgets/Page';
import { EditableProfileCard } from '@/features/Profile/EditableProfileCard';

export interface WorkEditPageProps {
    className?: string;
}

const WorkEditPage = ({ className }: WorkEditPageProps) => {
    const { id } = useParams<{ id: string }>();

    return (
        <Page
            data-testid="WorkEditPage"
            className={classNames('', {}, [className])}
        >
            <VStack
                gap="16"
                max
            >
                <p>WORT EDIT PAGE</p>
                {/*<EditableProfileCard id={id} />*/}
            </VStack>
        </Page>
    );
};

export default WorkEditPage;
