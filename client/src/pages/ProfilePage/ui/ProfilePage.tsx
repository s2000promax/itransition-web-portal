import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/libs/classNames/classNames';
import { VStack } from '@/shared/UI-kit/Stack';

export interface ProfilePageProps {
    className?: string;
}

const ProfilePage = ({ className }: ProfilePageProps) => {
    const { id } = useParams<{ id: string }>();
    const { t } = useTranslation('profile');

    return (
        <div
            data-testid="ProfilePage"
            className={classNames('', {}, [className])}
        >
            <VStack
                gap="16"
                max
            >
                <div>
                    {t('Profile')}
                    <span>{id}</span>
                </div>
            </VStack>
        </div>
    );
};

export default ProfilePage;
