import { memo } from 'react';
import { classNames } from '@/shared/libs/classNames/classNames';
import cls from './textBlockComponent.module.scss';
import { Text } from '@/shared/UI-kit/Text';
import { ReviewTextBlockI } from '@/entities/Review';

interface ReviewTextBlockComponentProps {
    className?: string;
    block: ReviewTextBlockI;
}

export const TextBlockComponent = memo(
    (props: ReviewTextBlockComponentProps) => {
        const { className, block } = props;

        return (
            <div
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
                        key={paragraph}
                        text={paragraph}
                        className={cls.paragraph}
                    />
                ))}
            </div>
        );
    },
);
