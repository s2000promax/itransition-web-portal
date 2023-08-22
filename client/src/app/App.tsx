import React from 'react';
import { useTranslation } from 'react-i18next';

const App = () => {
    const { t } = useTranslation();

    return (
        <div>
            <div className="content-page">{t('App')}</div>
        </div>
    );
};

export default App;
