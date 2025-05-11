import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';

import { PageLoader } from '@/shared/ui';

import { ThemeProvider } from './providers/ThemeProvider';

import './styles/style.css';

createRoot(document.getElementById('root') as HTMLElement).render(
    <StrictMode>
        <ThemeProvider>
            <Suspense fallback={<PageLoader />}>Hello World!</Suspense>
        </ThemeProvider>
    </StrictMode>
);
