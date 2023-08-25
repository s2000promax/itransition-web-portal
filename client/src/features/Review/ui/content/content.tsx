import { memo } from 'react';
import cls from './content.module.scss';
import { useSelector } from 'react-redux';
import { Text } from '@/shared/UI-kit/Text';
import { AppImage } from '@/shared/UI-kit/AppImage';
import { Skeleton } from '@/shared/UI-kit/Skeleton';
import { getReviewDataSelector } from '@/entities/Review';
import { renderBlocks } from '@/features/Review/ui/content/renderBlocks';

export const Content = memo(() => {
    const review = useSelector(getReviewDataSelector);

    return (
        <>
            <Text
                title={review?.title}
                size="l"
                bold
            />
            <Text title={review?.subtitle} />
            <AppImage
                fallback={
                    <Skeleton
                        width="100%"
                        height={420}
                        border="16px"
                    />
                }
                src={review?.img}
                className={cls.img}
            />
            {review?.blocks.map(renderBlocks)}
        </>
    );
});
