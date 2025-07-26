import { useEffect } from 'react';
import { useSearchParams } from 'react-router';

export const useUrlParamsStore = <T extends Record<string, string>>(params?: T, setParams?: (params: T) => void) => {
    const [queryParams, setQueryParams] = useSearchParams();

    const setParamsFromUrl = () => {
        const paramsFromUrl: Partial<T> = Object.keys(params as T).reduce((acc, key) => {
            const value = queryParams.get(key);
            if (typeof value === 'string') {
                acc[key as keyof T] = value as T[keyof T];
            }
            return acc;
        }, {} as Partial<T>);
        if (paramsFromUrl) {
            setParams?.(paramsFromUrl as T);
        }
    };

    useEffect(setParamsFromUrl, [queryParams]);

    useEffect(() => {
        const newQueryParams = new URLSearchParams();

        Object.keys(params as T).forEach((key) => {
            const value = params?.[key];
            if (value) {
                newQueryParams.set(key, value);
            }
        });
        setQueryParams(newQueryParams);
    }, [queryParams, params]);
};
