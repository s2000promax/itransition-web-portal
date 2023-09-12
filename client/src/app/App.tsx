import React, { memo, Suspense, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import AppRouter from '@/app/providers/router/ui/AppRouter';
import { classNames } from '@/shared/libs/classNames/classNames';
import { useTheme } from '@/shared/libs/hooks/useTheme/useTheme';
import { useAppDispatch } from '@/shared/libs/hooks/useAppDispatch/useAppDispatch';
import { useAppToolbar } from '@/shared/libs/hooks/useAppToolbar/useAppToolbar';
import { MainLayout } from '@/shared/layouts/MainLayout';
import { Navbar } from '@/widgets/Navbar';
import { Sidebar } from '@/widgets/Sidebar';
import { getUserInitedSelector, initUserData } from '@/entities/User';
import { AppLoaderLayout } from '@/shared/layouts/AppLoaderLayout';
import { useDebounce } from '@/shared/libs/hooks/useDebounce/useDebounce';

const App = memo(() => {
    const { theme } = useTheme();
    const dispatch = useAppDispatch();
    const inited = useSelector(getUserInitedSelector);
    const toolbar = useAppToolbar();

    const handleInited = useCallback(() => {
        console.log('RENDER 123', inited);
        dispatch(initUserData());
    }, [dispatch]);

    const debouncedInited = useDebounce(handleInited, 300);

    useEffect(() => {
        if (!inited) {
            // dispatch(initUserData());
            debouncedInited();
        }
    }, [inited]);

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
