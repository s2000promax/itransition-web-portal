import { matchPath, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
    AppRouteByPathPattern,
    AppRoutesEnums,
} from '@/shared/enums/router.enums';

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
