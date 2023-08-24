import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from './app/providers/ErrorBoundary';
import { ThemeProvider } from './app/providers/ThemeProvider';
import App from './app/App';
import './app/styles/index.scss';
import './shared/config/i18n/i18n';
import { StoreProvider } from '@/app/providers/StoreProvider';

const container = document.getElementById('root');

if (!container) {
    throw new Error('No found root container');
}

const root = createRoot(container);

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <ErrorBoundary>
                <StoreProvider>
                    <ThemeProvider>
                        <App />
                    </ThemeProvider>
                </StoreProvider>
            </ErrorBoundary>
        </BrowserRouter>
    </React.StrictMode>,
);
