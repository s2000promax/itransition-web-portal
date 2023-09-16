import React, { useCallback, useState } from 'react';
import { classNames } from '@/shared/libs/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { StarRate } from '@/shared/UI-kit/StarRate';

interface OwnerRatingProps {
    className?: string;
    rate?: number;
    onChangeOwnerRating?: (value: number) => void;
}

export const OwnerRating = (props: OwnerRatingProps) => {
    const { className, rate = 0, onChangeOwnerRating } = props;
    const { t } = useTranslation('ratingCard');
    const stars = Array(10)
        .fill(0)
        .map((_, index) => index + 1);
    const [starsCount, setStarsCount] = useState(rate);

    const onSelectStars = useCallback((selectedStarsCount: number) => {
        onChangeOwnerRating?.(selectedStarsCount);
        // setStarsCount(selectedStarsCount);
        // if (hasFeedback) {
        //   setIsModalOpen(true);
        // } else {
        //   onAccept?.(selectedStarsCount);
        // }
    }, []);

    return (
        <StarRate
            className={classNames('', {}, [className])}
            stars={stars}
            selectedStars={starsCount}
            size={30}
            onSelect={onSelectStars}
        />
    );
};
