/// <reference types="vite/client" />

import 'react';

declare module 'react' {
    interface CSSProperties {
        [varName: `--${string}`]: string | number | undefined;
    }
}
