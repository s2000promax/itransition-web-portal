import cls from '*.scss';
import { VStack } from '@/shared/UI-kit/Stack';
import { Skeleton } from '@/shared/UI-kit/Skeleton';

export const ContentSkeleton = () => {
    return (
        <VStack
            gap="16"
            max
        >
            <Skeleton
                className={cls.avatar}
                width={200}
                height={200}
                border="50%"
            />
            <Skeleton
                className={cls.title}
                width={300}
                height={32}
            />
            <Skeleton
                className={cls.skeleton}
                width={600}
                height={24}
            />
            <Skeleton
                className={cls.skeleton}
                width="100%"
                height={200}
            />
            <Skeleton
                className={cls.skeleton}
                width="100%"
                height={200}
            />
        </VStack>
    );
};
