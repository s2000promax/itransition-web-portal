import { memo } from 'react';
import { classNames } from '@/shared/libs/classNames/classNames';
import cls from './scrollToTopButton.module.scss';
import { Icon } from '@/shared/UI-kit/Icon';
import CircleIcon from '@/shared/assets/ui/icons/circle-up.svg';

interface ScrollToTopButtonProps {
    className?: string;
}

export const ScrollToTopButton = memo((props: ScrollToTopButtonProps) => {
    const { className } = props;

    const onCLick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <Icon
            Svg={CircleIcon}
            clickable
            onClick={onCLick}
            width={32}
            height={32}
            className={classNames(cls.ScrollToTopButton, {}, [className])}
        />
    );
});
