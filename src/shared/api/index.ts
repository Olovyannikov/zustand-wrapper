import { createRequestFx } from './create-request-fx';

export const createInternalRequestFx = <P = void>(fetcher: (params: P) => { url: string; options?: object }) =>
    createRequestFx<P>(
        {
            baseURL: import.meta.env.INTERNAL_API_URL ?? 'https://api.v2.react-learning.ru',
            withTokenInHeaders: true,
        },
        fetcher
    );

export const createCommonRequestFx = <P = void>(fetcher: (params: P) => { url: string; options?: object }) =>
    createRequestFx<P>(
        {
            baseURL: import.meta.env.INTERNAL_API_URL ?? 'https://api.v2.react-learning.ru',
        },
        fetcher
    );

export * from './types';
export * from './methods';
