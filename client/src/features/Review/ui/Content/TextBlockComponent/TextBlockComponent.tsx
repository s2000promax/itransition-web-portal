import { memo } from 'react';
import { classNames } from '@/shared/libs/classNames/classNames';
import cls from './TextBlockComponent.module.scss';
import { Text } from '@/shared/UI-kit/Text';
import { ReviewTextBlockI } from '@/entities/Review';
import { VStack } from '@/shared/UI-kit/Stack';

interface ReviewTextBlockComponentProps {
    className?: string;
    block: ReviewTextBlockI;
}

export const TextBlockComponent = memo(
    (props: ReviewTextBlockComponentProps) => {
        const { className, block } = props;

        return (
            <VStack
                max
                className={classNames(cls.ReviewTextBlockComponent, {}, [
                    className,
                ])}
            >
                {block.title && (
                    <Text
                        title={block.title}
                        className={cls.title}
                    />
                )}
                {block.paragraphs.map((paragraph, index) => (
                    <Text
                        key={`Paragraph_${block.sortId}_${paragraph.sortId}`}
                        text={paragraph.content}
                        className={cls.paragraph}
                    />
                ))}
            </VStack>
        );
    },
);
