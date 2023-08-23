import React, { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/libs/classNames/classNames';
import { useTheme } from '@/shared/libs/hooks/useTheme/useTheme';
import { MainLayout } from '@/shared/layouts/MainLayout';
import { useAppToolbar } from '@/shared/libs/hooks/useAppToolbar/useAppToolbar';
import { Navbar } from '@/widgets/Navbar';
import AppRouter from '@/app/providers/router/ui/AppRouter';
import { Sidebar } from '@/widgets/Sidebar';

const App = () => {
    const { theme } = useTheme();
    const toolbar = useAppToolbar();
    const { t } = useTranslation();

    return (
        <div
            id="app"
            className={classNames('app', {}, [theme])}
        >
            <Suspense fallback="">
                <MainLayout
                    header={<Navbar />}
                    content={<AppRouter />}
                    sidebar={<Sidebar />}
                    toolbar={toolbar}
                />
            </Suspense>
        </div>
    );
};

export default App;
