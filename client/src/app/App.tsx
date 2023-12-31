import React, { memo, Suspense, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import AppRouter from '@/app/providers/router/ui/AppRouter';
import { BrowserView, MobileView } from 'react-device-detect';
import { classNames } from '@/shared/libs/classNames/classNames';
import { useAppDispatch } from '@/shared/libs/hooks/useAppDispatch/useAppDispatch';
import { useAppToolbar } from '@/shared/libs/hooks/useAppToolbar/useAppToolbar';
import { MainLayout } from '@/shared/layouts/MainLayout';
import { Navbar } from '@/widgets/Navbar';
import { Sidebar } from '@/widgets/Sidebar';
import {
    getUserInitedSelector,
    getUserSettings,
    initUserDataService,
} from '@/entities/User';
import { AppLoaderLayout } from '@/shared/layouts/AppLoaderLayout';
import { useDebounce } from '@/shared/libs/hooks/useDebounce/useDebounce';
import { MobileLayout } from '@/shared/layouts/MobileLayout';

const App = memo(() => {
    const dispatch = useAppDispatch();
    const inited = useSelector(getUserInitedSelector);
    const { theme } = useSelector(getUserSettings);
    const toolbar = useAppToolbar();

    const handleInited = useCallback(() => {
        dispatch(initUserDataService());
    }, [dispatch]);

    const debouncedInited = useDebounce(handleInited, 300);

    useEffect(() => {
        if (!inited) {
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
                <BrowserView>
                    <MainLayout
                        header={<Navbar />}
                        content={<AppRouter />}
                        sidebar={<Sidebar />}
                        toolbar={toolbar}
                    />
                </BrowserView>
                <MobileView>
                    <MobileLayout
                        header={<Navbar />}
                        content={<AppRouter />}
                    />
                </MobileView>
            </Suspense>
        </div>
    );
});

export default App;
