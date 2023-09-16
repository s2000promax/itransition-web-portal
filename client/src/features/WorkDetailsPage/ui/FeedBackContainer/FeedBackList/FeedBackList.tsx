import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/libs/classNames/classNames';
import { CommentI } from '@/entities/Comment';
import { Text } from '@/shared/UI-kit/Text';
import { VStack } from '@/shared/UI-kit/Stack';
import { FeedBackCard } from './FeedBackCard/FeedBackCard';

interface FeedBackListProps {
    className?: string;
    comments?: CommentI[];
    isLoading?: boolean;
}

export const FeedBackList = memo((props: FeedBackListProps) => {
    const { className, isLoading, comments } = props;
    const { t } = useTranslation('workDetailsPage');

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
            {comments?.length ? (
                comments.map((comment) => (
                    <FeedBackCard
                        isLoading={isLoading}
                        feedback={comment}
                        key={comment.id}
                    />
                ))
            ) : (
                <Text text={t('no feedback yet')} />
            )}
        </VStack>
    );
});
