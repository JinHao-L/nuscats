import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
  IonButton,
  IonTitle,
  IonText,
} from '@ionic/react';
import { EMAIL_CONFIRM_ROUTE, LANDING_ROUTE, RESEND_EMAIL_ROUTE, SIGNIN_ROUTE } from 'app/routes';
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
    if (location.pathname !== EMAIL_CONFIRM_ROUTE) {
      return
    }

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
          }, 4000);
          setLoading(false);
        }
      });
    } else {
      history.push(LANDING_ROUTE);
    }
  }, [location?.search, location.pathname, history]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>NUS Cats</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="flex flex-col items-center space-y-6">
          <div className="m-5">
            <p className="mb-1 text-2xl font-semibold text-transparent bg-clip-text sm:text-3xl md:text-4xl bg-gradient-to-br from-primary-600 to-secondary-600">
              Email Confirmation
            </p>
            <p className="font-medium tracking-wide text-gray-800">NUS Cats will be letting you in soon...</p>
          </div>
          <div className="flex flex-col mx-2 my-5 text-center">
            {error && <IonText color="danger">{error}</IonText>}
            {success && <IonText color="success">{success}</IonText>}
          </div>

          <IonButton
            className="w-full max-w-md px-6 text-lg text-white cursor-pointer h-14"
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
        </div>
      </IonContent>
    </IonPage>
  );
};

export default EmailConfirmationPage;
