import { Fetcher } from 'swr';

export const ApiBaseUrl = process.env.REACT_APP_BASE_URL || '';

export const catsKey = '/cats';
export const sightingsKey = '/sightings';
export const latestKey = '/sightings/latest';
export const signupKey = "/auth/signup"
export const loginKey = '/auth/login';
export const logoutKey = '/auth/logout';
export const refreshLoginKey = '/auth/refresh';

export const resendConfirmKey = '/auth/resend-confirm';
export const confirmEmailKey = '/auth/confirm';
export const forgetPasswordKey = '/auth/forget-password';
export const passwordResetKey = '/auth/password-reset';
export const changePasswordKey = '/auth/change-password';

export const apiFetch = async (
    path: string,
    body?: any,
    options?: RequestInit,
): Promise<Response> => {
    return fetch(`${ApiBaseUrl}/v1${path}`, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            ...options?.headers,
        },
        credentials: 'include',
        ...options,
        body: body ? JSON.stringify(body) : null,
    });
};

export type Result<T> = {
    success: boolean;
    status: number;
    value: T;
};

// key can only be a single string
export const swrFetcher = <T>(body?: any, options?: RequestInit): Fetcher<Result<T>> =>
    async (key: string) => {
        const res = await apiFetch(key, body, options);
        return {
            success: res.ok,
            status: res.status,
            value: (await res.json()) as T,
        };
    };

export async function makeRequest<T>(
    path: RequestInfo,
    options?: RequestInit,
): Promise<T> {
    console.log(options);
    const response = await fetch(path, options);
    if (!response.ok) {
        const message =
            ((await getResponseAsJson(response))['message'] as string) ||
            'Request failed, please try again.';
        throw new Error(message);
    }
    return (await getResponseAsJson(response)) as T;
}

const getResponseAsJson = async (response: Response): Promise<any> => {
    const text = await response.text();
    return text.length ? JSON.parse(text) : {};
};
