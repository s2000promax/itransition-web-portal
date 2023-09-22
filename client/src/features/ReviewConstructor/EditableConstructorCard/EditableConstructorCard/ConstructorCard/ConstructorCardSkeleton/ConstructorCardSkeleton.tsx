import React from 'react';
import { Card } from '@/shared/UI-kit/Card';
import { HStack, VStack } from '@/shared/UI-kit/Stack';
import { Skeleton } from '@/shared/UI-kit/Skeleton';

export const ConstructorCardSkeleton = () => {
    return (
        <Card
            padding="24"
            fullWidth
        >
            <VStack gap="32">
                <HStack
                    max
                    justify="center"
                >
                    <Skeleton
                        width="100%"
                        height={200}
                    />
                </HStack>

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
                </VStack>
            </VStack>
        </Card>
    );
};
