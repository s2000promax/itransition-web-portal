import cls from './ContentSkeleton.module.scss';
import { VStack } from '@/shared/UI-kit/Stack';
import { Skeleton } from '@/shared/UI-kit/Skeleton';

export const ContentSkeleton = () => {
    return (
        <VStack
            gap="16"
            max
        >
            <Skeleton
                className={cls.title}
                width={600}
                height={32}
            />
            <Skeleton
                className={cls.skeleton}
                width={300}
                height={24}
            />
            <Skeleton
                className={cls.avatar}
                width="100%"
                height={200}
            />
            <Skeleton
                className={cls.skeleton}
                width="100%"
                height={80}
            />
            <Skeleton
                className={cls.skeleton}
                width="100%"
                height={150}
            />
        </VStack>
    );
};
