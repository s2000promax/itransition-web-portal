import { memo } from 'react';
import { classNames } from '@/shared/libs/classNames/classNames';
import cls from './ViewSelector.module.scss';
import { ReviewViewEnums } from '@/entities/Review';
import { Card } from '@/shared/UI-kit/Card';
import { HStack } from '@/shared/UI-kit/Stack';
import { Icon } from '@/shared/UI-kit/Icon';
import ListIcon from '@/shared/assets/ui/icons/burger.svg';
import TiledIcon from '@/shared/assets/ui/icons/tile.svg';

interface ViewSelectorProps {
    className?: string;
    view: ReviewViewEnums;
    onViewClick?: (view: ReviewViewEnums) => void;
}

const viewTypes = [
    {
        view: ReviewViewEnums.SMALL,
        icon: TiledIcon,
    },
    {
        view: ReviewViewEnums.BIG,
        icon: ListIcon,
    },
];

export const ViewSelector = memo((props: ViewSelectorProps) => {
    const { className, view, onViewClick } = props;

    const onClick = (newView: ReviewViewEnums) => () => {
        onViewClick?.(newView);
    };

    return (
        <Card
            className={classNames(cls.ViewSelector, {}, [className])}
            border="round"
        >
            <HStack gap="8">
                {viewTypes.map((viewType) => (
                    <Icon
                        clickable
                        key={viewType.view}
                        onClick={onClick(viewType.view)}
                        Svg={viewType.icon}
                        className={classNames('', {
                            [cls.notSelected]: viewType.view !== view,
                        })}
                    />
                ))}
            </HStack>
        </Card>
    );
});
