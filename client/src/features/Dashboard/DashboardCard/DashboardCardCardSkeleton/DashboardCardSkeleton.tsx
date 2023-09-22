import React from 'react';
import { Card } from '@/shared/UI-kit/Card';
import { VStack } from '@/shared/UI-kit/Stack';
import { Skeleton } from '@/shared/UI-kit/Skeleton';

export const DashboardCardSkeleton = () => {
    return (
        <Card
            padding="24"
            fullWidth
        >
            <VStack gap="32">
                <VStack
                    gap="16"
                    max
                >
                    <Skeleton
                        width="100%"
                        height={38}
                    />
                    <Skeleton
                        width="100%"
                        height={38}
                    />
                    <Skeleton
                        width="100%"
                        height={38}
                    />
                    <Skeleton
                        width="100%"
                        height={38}
                    />
                    <Skeleton
                        width="100%"
                        height={38}
                    />
                    <Skeleton
                        width="100%"
                        height={38}
                    />
                </VStack>
            </VStack>
        </Card>
    );
};
