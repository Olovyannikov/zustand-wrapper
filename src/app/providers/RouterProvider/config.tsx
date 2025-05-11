import { createBrowserRouter } from 'react-router';

import { ErrorPageLazy } from '@/pages/ErrorPage';

export const AppRoutes = {
    ERROR: 'error',
    INDEX: 'index',
    PRODUCT: 'product',
    PROFILE: 'profile',
    FAVORITES: 'favorites',
    SIGN_UP: 'signUp',
    SIGN_IN: 'signIn',
    CART: 'cart',
} as const;

type Keys = keyof typeof AppRoutes;
type AppRoute = (typeof AppRoutes)[Keys];

const RouterPaths: Record<AppRoute, string> = {
    [AppRoutes.INDEX]: '/',
    [AppRoutes.PRODUCT]: '/product/:slug',
    [AppRoutes.PROFILE]: '/profile/:userId',
    [AppRoutes.FAVORITES]: '/favorites',
    [AppRoutes.SIGN_UP]: '/sign-up',
    [AppRoutes.SIGN_IN]: '/sign-in',
    [AppRoutes.CART]: '/cart',
    [AppRoutes.ERROR]: '*',
};

export const routerConfig = createBrowserRouter([
    {
        path: RouterPaths.error,
        element: <ErrorPageLazy />,
    },
    // {
    //     path: RouterPaths.index,
    //     element: <IndexPageLazy />,
    //     loader: Loaders.index,
    // },
    // {
    //     path: RouterPaths.product,
    //     element: <ProductPageLazy />,
    //     loader: Loaders.product,
    // },
    // {
    //     path: RouterPaths.favorites,
    //     element: <FavoritesPageLazy />,
    //     loader: Loaders.favorites,
    // },
    // {
    //     path: RouterPaths.profile,
    //     element: <ProfilePageLazy />,
    //     loader: Loaders.profile,
    // },
    // {
    //     path: RouterPaths.signUp,
    //     element: <SignUpPageLazy />,
    // },
    // {
    //     path: RouterPaths.signIn,
    //     element: <SignInPageLazy />,
    // },
    // {
    //     path: RouterPaths.cart,
    //     element: <CartPageLazy />,
    // },
]);
