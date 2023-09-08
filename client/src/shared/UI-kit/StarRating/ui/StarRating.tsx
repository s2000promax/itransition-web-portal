import React, { memo, useState } from 'react';
import { classNames } from '@/shared/libs/classNames/classNames';
import cls from './StarRating.module.scss';
import StarIcon from '@/shared/assets/ui/icons/star.svg';
import { Icon } from '../../Icon';
import { HStack } from '@/shared/UI-kit/Stack';

interface StarRatingProps {
    className?: string;
    onSelect?: (starsCount: number) => void;
    size?: number;
    selectedStars?: number;
    stars?: number[];
}

export const StarRating = memo((props: StarRatingProps) => {
    const {
        className,
        size = 30,
        selectedStars = 0,
        onSelect,
        stars = [1, 2, 3, 4, 5],
    } = props;
    const [currentStarsCount, setCurrentStarsCount] = useState(selectedStars);
    const [isSelected, setIsSelected] = useState(Boolean(selectedStars));

    const onHover = (starsCount: number) => () => {
        if (!isSelected) {
            setCurrentStarsCount(starsCount);
        }
    };

    const onLeave = () => {
        if (!isSelected) {
            setCurrentStarsCount(0);
        }
    };

    const onClick = (starsCount: number) => () => {
        if (!isSelected) {
            onSelect?.(starsCount);
            setCurrentStarsCount(starsCount);
            setIsSelected(true);
        }
    };

    return (
        <HStack className={classNames(cls.StarRating, {}, [className])}>
            {stars.map((starNumber) => {
                const commonProps = {
                    className: classNames(
                        cls.starIcon,
                        { [cls.selected]: isSelected },
                        [
                            currentStarsCount >= starNumber
                                ? cls.hovered
                                : cls.normal,
                        ],
                    ),
                    Svg: StarIcon,
                    key: starNumber,
                    width: size,
                    height: size,
                    onMouseLeave: onLeave,
                    onMouseEnter: onHover(starNumber),
                    onClick: onClick(starNumber),
                    'data-testid': `StarRating.${starNumber}`,
                    'data-selected': currentStarsCount >= starNumber,
                };
                return (
                    <React.Fragment key={starNumber}>
                        <Icon
                            clickable={!isSelected}
                            {...commonProps}
                        />
                    </React.Fragment>
                );
            })}
        </HStack>
    );
});
