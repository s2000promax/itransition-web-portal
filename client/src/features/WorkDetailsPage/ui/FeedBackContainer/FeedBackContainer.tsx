import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/libs/classNames/classNames';
import { Text } from '@/shared/UI-kit/Text';
import { VStack } from '@/shared/UI-kit/Stack';
import { FeedBackList } from './FeedBackList/FeedBackList';
import { CommentI } from '@/entities/Comment';

interface FeedBackContainerProps {
    className?: string;
    id?: string;
}

export const FeedBackContainer = memo((props: FeedBackContainerProps) => {
    const { className, id } = props;
    const { t } = useTranslation('work');
    const feedbackList: CommentI[] = [];
    const feedbackListIsLoading = false;

    return (
        <VStack
            gap="16"
            max
            className={classNames('', {}, [className])}
        >
            <Text
                size="l"
                title={t('Feedbacks')}
            />

            <FeedBackList
                isLoading={feedbackListIsLoading}
                comments={feedbackList}
            />
        </VStack>
    );
});
