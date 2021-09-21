import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
  IonButton,
  IonTitle,
  IonText,
} from '@ionic/react';
import { LANDING_ROUTE, RESEND_EMAIL_ROUTE, SIGNIN_ROUTE } from 'app/routes';
import React, { useEffect, useState } from 'react';
import * as QueryString from 'query-string';
import { useHistory, useLocation } from 'react-router';
import { confirmEmail } from 'lib/auth';

const EmailConfirmationPage: React.FC = () => {
  const location = useLocation();
  const history = useHistory();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const query = QueryString.parse(location.search);
    if (query.token) {
      setLoading(true);

      confirmEmail(query.token as string).then((response) => {
        if (response.err) {
          setError(
            'Invalid request or request may have expired. Please make a new request',
          );
          setLoading(false);
        } else if (response.message) {
          setSuccess(response.message);
          setTimeout(() => {
            history.replace(SIGNIN_ROUTE);
          }, 3000);
          setLoading(false);
        }
      });
    } else {
      history.push(LANDING_ROUTE);
    }
  }, [location?.search]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>NUS Cats</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="mx-5 mt-5 mb-5">
          <p className="mb-1 text-3xl font-bold">Email Confirmation</p>
          <p>NUS Cats will be letting you in soon...</p>
        </div>
        <div className="flex flex-col mx-2 my-5 text-center">
          {error && <IonText color="danger">{error}</IonText>}
          {success && <IonText color="success">{success}</IonText>}
        </div>

        <IonButton
          className="mx-5 text-lg text-white cursor-pointer h-14"
          color="primary"
          expand="block"
          routerLink={success ? SIGNIN_ROUTE : RESEND_EMAIL_ROUTE}
          routerDirection="root"
          disabled={loading}
        >
          {loading
            ? 'Verifying email...'
            : success
            ? 'Proceed to login'
            : 'Resend confirmation email'}
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default EmailConfirmationPage;
