import React, { memo } from 'react';
import { classNames } from '@/shared/libs/classNames/classNames';
import cls from './StarRatingInfo.module.scss';
import StarIcon from '@/shared/assets/ui/icons/star.svg';
import { Icon } from '../../Icon';
import { HStack } from '@/shared/UI-kit/Stack';

interface StarRatingInfoProps {
    className?: string;
    size?: number;
    value?: number;
    stars?: number[];
}

export const StarRatingInfo = memo((props: StarRatingInfoProps) => {
    const { className, size = 30, value = 0, stars = [1, 2, 3, 4, 5] } = props;

    return (
        <HStack className={classNames(cls.StarRatingInfo, {}, [className])}>
            {stars.map((starNumber) => {
                const commonProps = {
                    className: classNames(cls.starIcon, {}, [
                        value >= starNumber ? cls.hovered : cls.normal,
                    ]),
                    Svg: StarIcon,
                    key: starNumber,
                    width: size,
                    height: size,

                    'data-testid': `StarRatingInfo.${starNumber}`,
                    'data-selected': value >= starNumber,
                };
                return (
                    <React.Fragment key={starNumber}>
                        <Icon {...commonProps} />
                    </React.Fragment>
                );
            })}
        </HStack>
    );
});
