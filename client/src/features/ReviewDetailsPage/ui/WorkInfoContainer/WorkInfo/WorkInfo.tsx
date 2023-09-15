import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/libs/classNames/classNames';
import { VStack } from '@/shared/UI-kit/Stack';
import { Text } from '@/shared/UI-kit/Text';
import { WorkI } from '@/entities/Work';
import { AppLink } from '@/shared/UI-kit/AppLink';
import { getRouteWorkDetails } from '@/shared/routes/routes.patterns';
import { AppImage } from '@/shared/UI-kit/AppImage';
import { Skeleton } from '@/shared/UI-kit/Skeleton';
import { DateFormatter } from '@/shared/libs/dateFormetter/dateFormatter';

interface WorkInfoProps {
    className?: string;
    data?: WorkI;
    isLoading?: boolean;
}

export const WorkInfo = memo((props: WorkInfoProps) => {
    const { className, data, isLoading } = props;
    const { t } = useTranslation('work');

    if (data?.id && data.releaseDate) {
        return (
            <AppLink
                to={getRouteWorkDetails(data.id)}
                className={classNames('', {}, [className])}
            >
                <VStack gap="4">
                    <Text
                        text={data.author}
                        bold
                    />
                    <Text text={DateFormatter(data.releaseDate)} />
                    <AppImage
                        fallback={
                            <Skeleton
                                width="100%"
                                height={40}
                                border="16px"
                            />
                        }
                        src={data.cover}
                        alt={data.title}
                    />
                    <Text
                        title={data.title}
                        bold
                    />
                    <Text
                        text={`${t('averageReviewsRating')}: ${
                            data.averageReviewsRating
                        }`}
                    />
                    <Text
                        text={`${t('averageUsersRating')}: ${
                            data.averageUsersRating
                        }`}
                    />
                </VStack>
            </AppLink>
        );
    }
});
