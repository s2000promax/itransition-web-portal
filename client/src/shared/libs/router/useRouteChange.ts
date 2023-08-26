import { matchPath, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AppRoutesEnums } from '@/shared/enums/router.enums';
import { AppRouteByPathPattern } from '@/shared/routes/routes.patterns';

export function useRouteChange() {
    const location = useLocation();
    const [appRoute, setAppRoute] = useState<AppRoutesEnums>(
        AppRoutesEnums.MAIN,
    );

    useEffect(() => {
        Object.entries(AppRouteByPathPattern).forEach(([pattern, route]) => {
            if (matchPath(pattern, location.pathname)) {
                setAppRoute(route);
            }
        });
    }, [location.pathname]);

    return appRoute;
}
