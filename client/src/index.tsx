import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app/App';

const container = document.getElementById('root');

if (!container) {
    throw new Error('No found root container');
}

const root = createRoot(container);

root.render(<App />);
