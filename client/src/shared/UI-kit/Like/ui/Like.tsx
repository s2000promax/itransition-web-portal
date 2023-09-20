import React, { memo, useState } from 'react';
import { classNames } from '@/shared/libs/classNames/classNames';
import cls from './Like.module.scss';
import LikeIcon from '@/shared/assets/ui/icons/like-heart.svg';
import { Icon } from '../../Icon';
import { HStack } from '@/shared/UI-kit/Stack';

interface LikeProps {
    className?: string;
    onLike: () => void;
}

export const Like = memo((props: LikeProps) => {
    const { className, onLike } = props;

    const [isLiked, setIsLiked] = useState(false);
    const [hovered, isHovered] = useState<Array<string | undefined>>([]);

    const onHover = () => () => {
        if (!isLiked) {
            isHovered(() => [cls.hovered]);
        }
    };

    const onLeave = () => {
        if (!isLiked) {
            isHovered([]);
        }
    };

    const onClick = () => () => {
        if (!isLiked) {
            onLike();
            setIsLiked(true);
        }
    };

    const commonProps = {
        className: classNames(cls.icon, {}, hovered),
        Svg: LikeIcon,

        width: 26,
        height: 24,
        onMouseLeave: onLeave,
        onMouseEnter: onHover(),
        onClick: onClick(),
        'data-selected': true,
    };

    return (
        <HStack className={classNames(cls.Like, {}, [className])}>
            <Icon
                clickable={true}
                {...commonProps}
            />
        </HStack>
    );
});
