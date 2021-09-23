import { useContext } from 'react';
import {
  getToken,
  deleteToken,
  MessagePayload,
  onMessage,
  Messaging,
} from 'firebase/messaging';
import useSWR from 'swr';
import { MessagingContext } from 'context/MessagingProvider';
import { createNotification, updateNotification } from 'lib/notification';

const notificationStorageKey = 'fcm';

export const useNotification = () => {
  const messaging = useContext(MessagingContext) as Messaging;

  const { data: token, mutate: setToken } = useSWR(
    'get-notification-permission',
    () => JSON.parse(localStorage.getItem(notificationStorageKey) || 'null'),
    { refreshInterval: 30000 },
  );


  const subscribe = async () => {
    // request permission
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      const registration = await navigator.serviceWorker.ready;

      console.log('Notification permission granted.');
      const firebaseToken = await getToken(messaging, {
        vapidKey: process.env.MESSAGING_VAPID_KEY,
        serviceWorkerRegistration: registration,
      });

      console.log('Messaging Token:', firebaseToken);
      if (token !== firebaseToken) {
        localStorage.setItem(notificationStorageKey, firebaseToken);
        setToken(firebaseToken);
        await updateNotification('subscribe', firebaseToken).then(({ err }) => {
          if (err) {
            console.log('Error updating token key in server');
          }
        }).catch(err => console.log(err));
      }

      return firebaseToken;
    } else {
      throw new Error('Unable to get user permission');
    }
  };

  const unsubscribe = () => {
    console.log(messaging);
    return deleteToken(messaging)
      .then((success) => {
        console.log('Token deleted.');
      })
      .catch((err) => {
        console.log('Unable to delete token. ', err);
      })
      .finally(() => {
        localStorage.removeItem(notificationStorageKey);
        setToken(null);
      });
  };

  const onNotification = (action: (msg: MessagePayload) => void) => {
    return onMessage(messaging, (payload: MessagePayload) => {
      action(payload);
    });
  };

  return {
    canSubscribe: navigator.serviceWorker.controller !== null && messaging !== null,
    notify: createNotification,
    subscribe,
    unsubscribe,
    onNotification,
    hasPermission: !!token,
  };
};
