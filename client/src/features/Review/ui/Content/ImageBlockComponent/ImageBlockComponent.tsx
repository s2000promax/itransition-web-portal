import { memo } from 'react';
import { classNames } from '@/shared/libs/classNames/classNames';
import cls from './ImageBlockComponent.module.scss';
import { Text } from '@/shared/UI-kit/Text';
import { ReviewImageBlockI } from '@/entities/Review';
import { VStack } from '@/shared/UI-kit/Stack';
import { AppImage } from '@/shared/UI-kit/AppImage';

interface ReviewImageBlockComponentProps {
    className?: string;
    block: ReviewImageBlockI;
}

export const ImageBlockComponent = memo(
    (props: ReviewImageBlockComponentProps) => {
        const { className, block } = props;

        return (
            <VStack
                max
                justify="center"
                align="center"
                className={classNames(cls.ImageBlockComponent, {}, [className])}
            >
                <AppImage
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
            </VStack>
        );
    },
);
