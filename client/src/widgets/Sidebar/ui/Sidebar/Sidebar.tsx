import { memo, useMemo, useState } from 'react';
import { classNames } from '@/shared/libs/classNames/classNames';
import cls from './Sidebar.module.scss';
import { useSidebarItems } from '@/entities/UI/Sidebar';
import { VStack } from '@/shared/UI-kit/Stack';
import { SidebarItem } from '../SidebarItem/SidebarItem';
import { AppLogo } from '@/shared/UI-kit/AppLogo';
import { Icon } from '@/shared/UI-kit/Icon';
import ArrowIcon from '@/shared/assets/ui/icons/arrow-bottom.svg';
import { LanguageDropdown } from '@/features/UI/LanguageDropdown';
import { ColorThemeSwitcherDropdown } from '@/features/UI/ColorThemeSwitcherDropdown';

interface SidebarProps {
    className?: string;
}

export const Sidebar = memo(({ className }: SidebarProps) => {
    const [collapsed, setCollapsed] = useState(false);
    const sidebarItemsList = useSidebarItems();

    const onToggle = () => {
        setCollapsed((prev) => !prev);
    };

    const itemsList = useMemo(
        () =>
            sidebarItemsList.map((item) => (
                <SidebarItem
                    item={item}
                    collapsed={collapsed}
                    key={item.path}
                />
            )),
        [collapsed, sidebarItemsList],
    );

    return (
        <aside
            data-testid="sidebar"
            className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [
                className,
            ])}
        >
            <AppLogo
                size={collapsed ? 25 : 50}
                className={cls.appLogo}
            />
            <VStack
                role="navigation"
                gap="8"
                className={cls.items}
            >
                {itemsList}
            </VStack>
            <Icon
                data-testid="sidebar-toggle"
                onClick={onToggle}
                className={cls.collapseBtn}
                Svg={ArrowIcon}
                clickable
            />
            <div className={cls.switchers}>
                <ColorThemeSwitcherDropdown />

                <LanguageDropdown />
            </div>
        </aside>
    );
});
