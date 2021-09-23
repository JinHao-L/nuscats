import {
  apiFetch,
  changePasswordKey,
  confirmEmailKey,
  forgetPasswordKey,
  loginKey,
  logoutKey,
  signupKey,
  passwordResetKey,
  resendConfirmKey,
  changeUsernameKey,
} from './api';
import { RoleType, User } from '@api/users';

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

  gtag('event', 'login', {
    method: 'Google',
  });

  return {
    user: (await res.json()) as User,
    unauthorized: false,
  };
}

export async function logout(): Promise<void> {
  await apiFetch(logoutKey, null, { method: 'POST' });
}

export async function signup(
  email: string,
  username: string,
  password: string,
): Promise<Error | undefined> {
  let res = await apiFetch(
    signupKey,
    { email, username, password },
    { method: 'POST' },
  );

  gtag('event', 'sign_up', {
    method: 'Google',
  });

  if (!res.ok) {
    let msg = ((await res.json()) as any).message;
    return new Error(msg);
  }
}

export interface ApiResponse {
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

export async function changeUsername(username: string): Promise<ApiResponse> {
  const res = await apiFetch(
    changeUsernameKey,
    { username },
    { method: 'POST' },
  );
  console.log(res);
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

export function isAdmin(user?: User): boolean {
  return Boolean(user?.roles.includes(RoleType.Admin));
}
