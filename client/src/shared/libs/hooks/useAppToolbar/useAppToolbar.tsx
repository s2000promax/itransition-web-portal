import { ReactElement } from 'react';
import { AppRoutesEnums } from '@/shared/enums/router.enums';
import { ScrollToolbar } from '@/widgets/ScrollToolbar';
import { useRouteChange } from '@/shared/libs/router/useRouteChange';

export function useAppToolbar() {
    const appRoute = useRouteChange();
    const scrollToolbar = <ScrollToolbar />;

    const toolbarByAppRoute: OptionalRecord<AppRoutesEnums, ReactElement> = {
        [AppRoutesEnums.REVIEW_LIST]: scrollToolbar,
        [AppRoutesEnums.REVIEW_DETAILS]: scrollToolbar,
    };

    return toolbarByAppRoute[appRoute];
}
