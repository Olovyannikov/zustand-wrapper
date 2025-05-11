import type { PropsWithChildren } from 'react';
import { Helmet } from 'react-helmet';

import { useIsLarge } from '@/shared/lib/hooks';

import { Footer, Header, Navigation } from './ui';

import s from './RootLayout.module.css';

export const RootLayout = ({ children, title = 'Dogfood | Главная' }: PropsWithChildren<{ title?: string }>) => {
    const isLarge = useIsLarge();

    return (
        <>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <div className={s.wrapper}>
                <Header className={s.header} />
                <main className={s.main}>{children}</main>
                <Footer className={s.footer} />
                {isLarge ? null : <Navigation />}
            </div>
        </>
    );
};
