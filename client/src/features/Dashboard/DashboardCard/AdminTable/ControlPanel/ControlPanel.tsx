import React, { memo } from 'react';
import { classNames } from '@/shared/libs/classNames/classNames';
import cls from './ControlPanel.module.scss';
import { HStack, VStack } from '@/shared/UI-kit/Stack';
import { Icon } from '@/shared/UI-kit/Icon';
import LockIcon from '@/shared/assets/ui/icons/lock.svg';
import UnLockIcon from '@/shared/assets/ui/icons/unlock.svg';
import DeleteIcon from '@/shared/assets/ui/icons/delete.svg';
import { Button } from '@/shared/UI-kit/Button';

interface ControlPanelProps {
    className?: string;
}

export const ControlPanel = memo((props: ControlPanelProps) => {
    const { className } = props;

    return (
        <VStack
            max
            className={classNames(cls.ControlPanel, {}, [className])}
        >
            <HStack
                max
                justify="between"
            >
                <HStack
                    align="center"
                    gap="16"
                >
                    <Button variant="clear">
                        <Icon Svg={UnLockIcon} />
                    </Button>
                    <Button variant="clear">
                        <Icon Svg={LockIcon} />
                    </Button>
                </HStack>
                <Button
                    variant="clear"
                    className={cls.delete}
                >
                    <Icon Svg={DeleteIcon} />
                </Button>
            </HStack>
        </VStack>
    );
});
