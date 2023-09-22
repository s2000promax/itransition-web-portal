import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/libs/classNames/classNames';
import cls from './DashboardCardHeader.module.scss';
import { HStack } from '@/shared/UI-kit/Stack';
import { Text } from '@/shared/UI-kit/Text';
import { Card } from '@/shared/UI-kit/Card';
import { BackButton } from '@/shared/UI-kit/BackButton';

interface DashboardCardHeaderProps {
    className?: string;
}

export const DashboardCardHeader = memo((props: DashboardCardHeaderProps) => {
    const { className } = props;
    const { t } = useTranslation('adminPage');

    return (
        <Card
            padding="24"
            fullWidth
            border="partial"
            className={classNames(cls.DashboardCardHeader, {}, [className])}
        >
            <BackButton className={cls.backButton} />
            <HStack
                max
                justify="between"
                className={cls.header}
            >
                <Text title={t('title')} />
            </HStack>
        </Card>
    );
});
