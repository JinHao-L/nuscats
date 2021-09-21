import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
  IonButton,
  IonTitle,
  IonLoading,
  IonText,
} from '@ionic/react';
import { LANDING_ROUTE, SIGNIN_ROUTE } from 'app/routes';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import * as QueryString from 'query-string';
import { resetPassword } from 'lib/auth';

const ResetPasswordPage: React.FC = () => {
  const location = useLocation();
  const history = useHistory();
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [cfmPassword, setCfmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const query = QueryString.parse(location.search);
    if (query.token) {
      setToken(query.token as string);
    } else {
      history.push(LANDING_ROUTE);
    }
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setSuccess('');
    if (password !== cfmPassword) {
      setError('Password mismatch');
      return;
    }
    setLoading(true);
    return resetPassword(token, password).then((response) => {
      if (response.err) {
        setError(response.err);
      } else if (response.message) {
        setSuccess(response.message);
        setLoading(false);
        setTimeout(() => {
          history.replace(LANDING_ROUTE);
        }, 3000);
        return;
      }
      setLoading(false);
    });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>NUS Cats</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="mx-5 mt-5 mb-5">
          <p className="mb-1 text-3xl font-bold">Password Reset</p>
          <p>Enter your new password</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col mt-5">
            <div className="block mx-5 mb-6 bg-gray-200 h-14 rounded-xl">
              <label
                className="block pt-1 pl-3 text-xs text-gray-700"
                htmlFor="password"
              >
                New Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required={true}
                className="block w-full px-3 py-1 bg-gray-200 border rounded-xl focus:outline-none"
              />
            </div>
            <div className="block mx-5 mb-6 bg-gray-200 h-14 rounded-xl">
              <label
                className="block pt-1 pl-3 text-xs text-gray-700"
                htmlFor="cfmPassword"
              >
                Confirm new password
              </label>
              <input
                id="cfmPassword"
                type="password"
                value={cfmPassword}
                onChange={(e) => setCfmPassword(e.target.value)}
                required={true}
                className="block w-full px-3 py-1 bg-gray-200 border rounded-xl focus:outline-none"
              />
            </div>
          </div>
          <IonButton
            className="mx-5 text-lg text-white cursor-pointer h-14"
            color="primary"
            expand="block"
            type={success ? undefined : 'submit'}
            routerLink={success ? SIGNIN_ROUTE : undefined}
            routerDirection={'root'}
            disabled={!!success}
          >
            {success ? 'Reset Password' : 'Sign in'}
          </IonButton>
        </form>
        <IonLoading isOpen={loading} message={'Please wait...'} />
        <div className="flex flex-col gap-2 mx-5 mt-5">
          {error && (
            <IonText color="danger" className="text-center ">
              {error}
            </IonText>
          )}
          {success && (
            <IonText color="success" className="text-center ">
              {success}
            </IonText>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ResetPasswordPage;
