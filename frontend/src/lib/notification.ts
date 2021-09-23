import { NotificationTopic } from '@api/notifyTopics';
import {
  notificationSubscribeKey,
  notificationUnsubscribeKey,
  apiFetch,
  notificationCreateKey,
} from './api';
import { ApiResponse } from './auth';

export const updateNotification = async (
  type: 'subscribe' | 'unsubscribe',
  token: string,
): Promise<ApiResponse> => {
  const apiKey =
    type === 'subscribe'
      ? notificationSubscribeKey
      : notificationUnsubscribeKey;

  const res = await apiFetch(apiKey, { token }, { method: 'POST' });

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
};

export const createNotification = async (
  target: NotificationTopic,
  title: string,
  body: string,
): Promise<ApiResponse> => {
  const apiKey = notificationCreateKey;

  const res = await apiFetch(
    apiKey,
    { topic: target, title, body },
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
};
