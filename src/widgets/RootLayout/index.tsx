import type { PropsWithChildren } from 'react';
import { Helmet } from 'react-helmet';

import s from './RootLayout.module.css';

export const RootLayout = ({ children, title = 'Dogfood | Главная' }: PropsWithChildren<{ title?: string }>) => (
    <>
        <Helmet>
            <title>{title}</title>
        </Helmet>
        <div className={s.wrapper}>
            {/*<Header className={s.header} />*/}
            <main className={s.main}>{children}</main>
            {/*<Footer className={s.footer} />*/}
        </div>
    </>
);
