import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import ThemeProvider from './app/providers/ThemeProvider/ui/ThemeProvider';
import App from './app/App';
import './app/styles/index.scss';
import ErrorBoundary from '@/app/providers/ErrorBoundary/ui/ErrorBoundary';

const container = document.getElementById('root');

if (!container) {
    throw new Error('No found root container');
}

const root = createRoot(container);

root.render(
    <BrowserRouter>
        <ErrorBoundary>
            <ThemeProvider>
                <App />
            </ThemeProvider>
        </ErrorBoundary>
    </BrowserRouter>,
);
