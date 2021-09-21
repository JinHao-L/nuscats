import {
  apiFetch,
  changePasswordKey,
  confirmEmailKey,
  forgetPasswordKey,
  loginKey,
  logoutKey,
  passwordResetKey,
  resendConfirmKey,
} from './api';
import { User } from '@api/users';

class LoginResponse {
  user?: User;
  err?: Error;
  unauthorized: boolean = false;
}

export async function login(
  email: string,
  password: string,
): Promise<LoginResponse> {
  let res = await apiFetch(loginKey, { email, password }, { method: 'POST' });
  if (!res.ok) {
    let msg = ((await res.json()) as any).message;
    return {
      err: new Error(msg),
      unauthorized: res.status === 401,
    };
  }

  return {
    user: (await res.json()) as User,
    unauthorized: false,
  };
}

export async function logout(): Promise<void> {
  await apiFetch(logoutKey, null);
}

interface ApiResponse {
  message?: string;
  err?: string;
  statusCode?: number;
}

export async function confirmEmail(token: string): Promise<ApiResponse> {
  const res = await apiFetch(confirmEmailKey, { token }, { method: 'POST' });

  if (!res.ok) {
    let msg = ((await res.json()) as any).message;
    return {
      err: msg,
      statusCode: res.status,
    };
  }

  return {
    message: await res.text(),
    statusCode: res.status,
  };
}

export async function resetPassword(
  token: string,
  password: string,
): Promise<ApiResponse> {
  const res = await apiFetch(
    passwordResetKey,
    { token, password },
    { method: 'POST' },
  );

  if (!res.ok) {
    let msg = ((await res.json()) as any).message;
    return {
      err: msg,
      statusCode: res.status,
    };
  }

  return {
    message: await res.text(),
    statusCode: res.status,
  };
}

export async function changePassword(
  oldPassword: string,
  newPassword: string,
): Promise<ApiResponse> {
  const res = await apiFetch(
    changePasswordKey,
    { oldPassword, newPassword },
    { method: 'POST' },
  );

  if (!res.ok) {
    let msg = ((await res.json()) as any).message;
    return {
      err: msg,
      statusCode: res.status,
    };
  }

  return {
    message: await res.text(),
    statusCode: res.status,
  };
}

export async function resendConfirmation(email: string): Promise<ApiResponse> {
  const res = await apiFetch(resendConfirmKey, { email }, { method: 'POST' });

  if (!res.ok) {
    let msg = ((await res.json()) as any).message;
    return {
      err: msg,
      statusCode: res.status,
    };
  }

  return {
    message: await res.text(),
    statusCode: res.status,
  };
}

export async function forgetPassword(email: string): Promise<ApiResponse> {
  const res = await apiFetch(forgetPasswordKey, { email }, { method: 'POST' });

  if (!res.ok) {
    let msg = ((await res.json()) as any).message;
    return {
      err: msg,
      statusCode: res.status,
    };
  }

  return {
    message: await res.text(),
    statusCode: res.status,
  };
}
