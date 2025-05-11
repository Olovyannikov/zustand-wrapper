import { type FetchOptions, ofetch } from 'ofetch';
import { createStore, type StateCreator } from 'zustand';

import { STORAGE } from '@/shared/lib/services';

interface RequestState<P, R> {
    loading: boolean;
    data: R | null;
    error: Error | null;
    execute: (params: P) => Promise<void>;
}

type CreateRequestParams = FetchOptions & {
    url: string;
};

type Fn<P> = (params: P) => CreateRequestParams;

type Payload<P> = CreateRequestParams | Fn<P>;

interface CreateRequestInstanceParams<P> {
    baseURL?: string;
    headers?: HeadersInit;
    withTokenInHeaders?: boolean;
    payload: Payload<P>;
}

type CreateRequestFxParams = Omit<CreateRequestInstanceParams<CreateRequestParams>, 'payload'>;

function getConfig<P>(payload: Payload<P>, params: P): CreateRequestParams {
    return typeof payload === 'function' ? payload(params) : payload;
}

const createRequestInstance =
    <P = CreateRequestParams, R = void>({
        baseURL,
        headers,
        payload,
        withTokenInHeaders,
    }: CreateRequestInstanceParams<P>): StateCreator<RequestState<P, R>> =>
    (set) => ({
        loading: false,
        data: null,
        error: null,
        execute: async (params) => {
            set({ loading: true, error: null });

            try {
                const { url, ...fetchOptions } = getConfig(payload, params);
                const newHeaders = new Headers(headers);

                if (withTokenInHeaders) {
                    newHeaders.append('Authorization', STORAGE.getJSON('accessToken'));
                }

                const response = await ofetch(url, {
                    ...fetchOptions,
                    headers: newHeaders,
                    baseURL,
                });

                set({ data: response, loading: false });
            } catch (error) {
                set({ error: error as Error, loading: false });
            }
        },
    });

export const createRequestFx =
    (params: CreateRequestFxParams) =>
    <P = CreateRequestParams, R = void>(payload: Payload<P>) =>
        createStore<RequestState<P, R>>(
            createRequestInstance<P, R>({
                ...params,
                payload,
            })
        );
