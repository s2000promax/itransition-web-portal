import React from 'react';
import { Card } from '@/shared/UI-kit/Card';
import { HStack, VStack } from '@/shared/UI-kit/Stack';
import { Skeleton } from '@/shared/UI-kit/Skeleton';

export const ProfileCardSkeleton = () => {
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
                        border="100%"
                        width={128}
                        height={128}
                    />
                </HStack>
                <HStack
                    gap="32"
                    max
                >
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
                </HStack>
            </VStack>
        </Card>
    );
};
