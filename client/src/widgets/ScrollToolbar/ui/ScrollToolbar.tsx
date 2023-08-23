import { memo } from 'react';
import { ScrollToTopButton } from '@/features/UI/ScrollToTopButton';
import { classNames } from '@/shared/libs/classNames/classNames';
import cls from './ScrollToolbar.module.scss';
import { VStack } from '@/shared/UI-kit/Stack';

interface ScrollToolbarProps {
    className?: string;
}

export const ScrollToolbar = memo((props: ScrollToolbarProps) => {
    const { className } = props;

    return (
        <VStack
            justify="center"
            align="center"
            max
            className={classNames(cls.ScrollToolbar, {}, [className])}
        >
            <ScrollToTopButton />
        </VStack>
    );
});
