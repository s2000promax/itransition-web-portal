import React, { memo } from 'react';
import cls from './Content.module.scss';
import { useSelector } from 'react-redux';
import { Text } from '@/shared/UI-kit/Text';
import { AppImage } from '@/shared/UI-kit/AppImage';
import { Skeleton } from '@/shared/UI-kit/Skeleton';
import { getWorkDataSelector } from '@/entities/Work';
import { HStack } from '@/shared/UI-kit/Stack';
import { DateFormatter } from '@/shared/libs/dateFormetter/dateFormatter';

interface ContentProps {
    id?: string;
}

export const Content = memo((props: ContentProps) => {
    const work = useSelector(getWorkDataSelector);

    return (
        <>
            <Text
                title={work?.title}
                size="l"
                bold
            />
            <HStack gap="16">
                <Text
                    title={work?.author}
                    bold
                />
                <Text title={DateFormatter(work?.releaseDate!)} />
            </HStack>

            <AppImage
                fallback={
                    <Skeleton
                        width="100%"
                        height={420}
                        border="16px"
                    />
                }
                src={work?.cover}
                alt={work?.title}
                className={cls.img}
            />
            <Text
                title={work?.description}
                size="s"
            />
        </>
    );
});
