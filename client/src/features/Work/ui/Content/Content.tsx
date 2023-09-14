import React, { memo } from 'react';
import cls from './Content.module.scss';
import { useSelector } from 'react-redux';
import { Text } from '@/shared/UI-kit/Text';
import { AppImage } from '@/shared/UI-kit/AppImage';
import { Skeleton } from '@/shared/UI-kit/Skeleton';
import { getReviewDataSelector } from '@/entities/Review';
import { renderBlocks } from '@/features/Review/ui/Content/RenderBlocks';
import { getWorkDataSelector } from '@/entities/Work';
import { HStack } from '@/shared/UI-kit/Stack';
import { AppLink } from '@/shared/UI-kit/AppLink';
import {
    getRouteReviewCreate,
    getRouteWorkEdit,
} from '@/shared/routes/routes.patterns';
import { Icon } from '@/shared/UI-kit/Icon';
import CreateIcon from '@/shared/assets/ui/icons/create-review.svg';
import EditIcon from '@/shared/assets/ui/icons/edit.svg';
import { isUserRoleAdminSelector } from '@/entities/User';

interface ContentProps {
    id?: string;
}

export const Content = memo((props: ContentProps) => {
    const { id } = props;
    const work = useSelector(getWorkDataSelector);
    const isUserRoleAdmin = useSelector(isUserRoleAdminSelector);

    return (
        <>
            <HStack>
                <AppLink to={getRouteReviewCreate()}>
                    <Icon Svg={CreateIcon} />
                </AppLink>
                {isUserRoleAdmin && (
                    <AppLink to={getRouteWorkEdit(id!)}>
                        <Icon Svg={EditIcon} />
                    </AppLink>
                )}
            </HStack>

            <Text
                title={work?.title}
                size="l"
                bold
            />
            <HStack>
                <Text title={work?.author} />
                <Text title={'work?.releaseDate?.toDateString()'} />
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
