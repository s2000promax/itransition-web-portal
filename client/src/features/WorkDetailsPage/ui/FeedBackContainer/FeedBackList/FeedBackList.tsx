import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/libs/classNames/classNames';
import { Text } from '@/shared/UI-kit/Text';
import { VStack } from '@/shared/UI-kit/Stack';
import { FeedBackCard } from './FeedBackCard/FeedBackCard';
import { FeedbackI } from '@/entities/FeedBack';

interface FeedBackListProps {
    className?: string;
    feedbackList?: FeedbackI[];
    isLoading?: boolean;
}

export const FeedBackList = memo((props: FeedBackListProps) => {
    const { className, isLoading, feedbackList } = props;
    const { t } = useTranslation('work');

    if (isLoading) {
        return (
            <VStack
                gap="16"
                max
                className={classNames('', {}, [className])}
            >
                <FeedBackCard isLoading />
                <FeedBackCard isLoading />
                <FeedBackCard isLoading />
            </VStack>
        );
    }

    return (
        <VStack
            gap="16"
            max
            className={classNames('', {}, [className])}
        >
            {feedbackList?.length ? (
                feedbackList.map((feedback) => (
                    <FeedBackCard
                        isLoading={isLoading}
                        feedback={feedback}
                        key={feedback.user.id}
                    />
                ))
            ) : (
                <Text text={t('no_feedback')} />
            )}
        </VStack>
    );
});
