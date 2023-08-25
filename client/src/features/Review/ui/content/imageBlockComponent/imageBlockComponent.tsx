import { memo } from 'react';
import { classNames } from '@/shared/libs/classNames/classNames';
import cls from './imageBlockComponent.module.scss';
import { Text } from '@/shared/UI-kit/Text';
import { ReviewImageBlockI } from '@/entities/Review';

interface ReviewImageBlockComponentProps {
    className?: string;
    block: ReviewImageBlockI;
}

export const ImageBlockComponent = memo(
    (props: ReviewImageBlockComponentProps) => {
        const { className, block } = props;

        return (
            <div
                className={classNames(cls.ArticleImageBlockComponent, {}, [
                    className,
                ])}
            >
                <img
                    src={block.src}
                    alt={block.title}
                    className={cls.img}
                />
                {block.title && (
                    <Text
                        text={block.title}
                        align="center"
                    />
                )}
            </div>
        );
    },
);
