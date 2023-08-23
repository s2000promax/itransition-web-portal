import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { classNames } from '@/shared/libs/classNames/classNames';
import { SidebarItemI } from '@/entities/UI/Sidebar/types/SidebarItem.interface';
import { AppLink } from '@/shared/UI-kit/AppLink';
import { Icon } from '@/shared/UI-kit/Icon';
import cls from './SidebarItem.module.scss';

interface SidebarItemProps {
    item: SidebarItemI;
    collapsed: boolean;
}

export const SidebarItem = memo(({ item, collapsed }: SidebarItemProps) => {
    const { t } = useTranslation();
    const isAuth = false;

    if (item.authOnly && !isAuth) {
        return null;
    }

    return (
        <AppLink
            to={item.path}
            className={classNames(cls.item, {
                [cls.collapsed]: collapsed,
            })}
            activeClassName={cls.active}
        >
            <Icon Svg={item.Icon} />
            <span className={cls.link}>{t(item.text)}</span>
        </AppLink>
    );
});
