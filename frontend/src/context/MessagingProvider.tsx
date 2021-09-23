import { initializeApp } from '@firebase/app';
import { IonLoading } from '@ionic/react';
import { getMessaging, Messaging } from 'firebase/messaging';
import { createContext, useEffect, useState } from 'react';

export const firebaseConfig = {
  apiKey: 'AIzaSyAEveDDjIrmcCAfDTZeR2NPfkNDcXnq_cU',
  authDomain: 'nuscats.firebaseapp.com',
  projectId: 'nuscats',
  storageBucket: 'nuscats.appspot.com',
  messagingSenderId: '645171323336',
  appId: '1:645171323336:web:774ddb245f9dab232760fd',
  measurementId: 'G-N2513MDLHS',
};

type MessagingType = Messaging | null;

export const MessagingContext = createContext<MessagingType>(null);

const MessagingProvider: React.FC = ({ children }) => {
  const app = initializeApp(firebaseConfig);
  const messaging = getMessaging(app);

  if (messaging === null) {
    <IonLoading isOpen={!!messaging} />;
  }

  return (
    <MessagingContext.Provider value={messaging}>
      {children}
    </MessagingContext.Provider>
  );
};

export default MessagingProvider;
