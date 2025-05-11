import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';

import { useAppStarted } from '@/shared/lib/services';
import { PageLoader } from '@/shared/ui';

import { RouterProvider } from './providers/RouterProvider';
import { ThemeProvider } from './providers/ThemeProvider';

import './styles/style.css';

useAppStarted.setState(true);

createRoot(document.getElementById('root') as HTMLElement).render(
    <StrictMode>
        <ThemeProvider>
            <Suspense fallback={<PageLoader />}>
                <RouterProvider />
            </Suspense>
        </ThemeProvider>
    </StrictMode>
);
