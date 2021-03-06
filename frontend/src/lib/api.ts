import { Fetcher } from 'swr';

export const ApiBaseUrl = process.env.REACT_APP_BASE_URL || '';

export const catsKey = '/cats';
export const sightingsKey = '/sightings';
export const latestKey = '/sightings/latest';
export const alertSightingsKey = '/sightings/alert';
export const signupKey = '/auth/signup';
export const loginKey = '/auth/login';
export const logoutKey = '/auth/logout';
export const refreshLoginKey = '/auth/refresh';
export const catPicUploadKey = '/uploads/cats';

export const resendConfirmKey = '/auth/resend-confirm';
export const confirmEmailKey = '/auth/confirm';
export const forgetPasswordKey = '/auth/forget-password';
export const passwordResetKey = '/auth/password-reset';
export const changePasswordKey = '/auth/change-password';
export const changeUsernameKey = '/auth/change-username';

export const notificationSubscribeKey = '/notify/subscribe';
export const notificationUnsubscribeKey = '/notify/unsubscribe';
export const notificationCreateKey = '/notify/create';

export const apiFetch = async (
  path: string,
  body?: any,
  options?: RequestInit & { timeout?: number },
): Promise<Response> => {

  const { timeout = 15000 } = options ?? { timeout: 15000 } // default 15 seconds timeout

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout)

  const res = await fetch(`${ApiBaseUrl}/v1${path}`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    credentials: 'include',
    ...options,
    signal: controller.signal,
    body: body ? JSON.stringify(body) : null,
  });

  clearTimeout(id)

  return res;
};

export type Result<T> = {
  success: boolean;
  status: number;
  value: T;
};

// key can only be a single string
export const swrFetcher =
  <T>(body?: any, options?: RequestInit): Fetcher<Result<T>> =>
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
