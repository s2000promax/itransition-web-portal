import React, { memo, Suspense, useEffect } from 'react';
import { useSelector } from 'react-redux';
import AppRouter from '@/app/providers/router/ui/AppRouter';
import { classNames } from '@/shared/libs/classNames/classNames';
import { useTheme } from '@/shared/libs/hooks/useTheme/useTheme';
import { useAppDispatch } from '@/shared/libs/hooks/useAppDispatch/useAppDispatch';
import { useAppToolbar } from '@/shared/libs/hooks/useAppToolbar/useAppToolbar';
import { MainLayout } from '@/shared/layouts/MainLayout';
import { Navbar } from '@/widgets/Navbar';
import { Sidebar } from '@/widgets/Sidebar';
import { getUserInited, initAuthData } from '@/entities/User';
import { AppLoaderLayout } from '@/shared/layouts/AppLoaderLayout';

const App = memo(() => {
    const { theme } = useTheme();
    const dispatch = useAppDispatch();
    const inited = useSelector(getUserInited);
    const toolbar = useAppToolbar();

    useEffect(() => {
        if (!inited) {
            dispatch(initAuthData());
        }
    }, [dispatch, inited]);

    if (!inited) {
        return (
            <div
                id="app"
                className={classNames('app', {}, [theme])}
            >
                <AppLoaderLayout />
            </div>
        );
    }

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
});

export default App;
