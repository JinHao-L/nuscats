import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonContent,
  IonButton,
  IonLoading,
  IonText,
} from '@ionic/react';
import { forgetPassword } from 'lib/auth';
import React, { useState } from 'react';

const ForgetPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    return forgetPassword(email).then((response) => {
      if (response.err) {
        setError(response.err);
      } else if (response.message) {
        setSuccess(response.message);
      }
      setLoading(false);
    });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="mx-5 mt-5 mb-5">
          <p className="mb-1 text-3xl font-bold">Forget password?</p>
          <p>No worries! We got your back 🐱</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col mt-5">
            <div className="block mx-5 mb-6 bg-gray-200 h-14 rounded-xl">
              <label
                className="block pt-1 pl-3 text-xs text-gray-700"
                htmlFor="email"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                required={true}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full px-3 py-1 bg-gray-200 border rounded-xl focus:outline-none"
              />
            </div>
          </div>
          <IonButton
            className="mx-5 text-lg text-white cursor-pointer h-14"
            color="primary"
            expand="block"
            type={'submit'}
            disabled={!!success}
          >
            Send password reset email
          </IonButton>
        </form>
        <IonLoading isOpen={loading} message={'Please wait...'} />
        <div className="flex flex-col gap-2 mx-5 mt-5">
          {error && (
            <IonText color="danger" className="text-center ">
              {error}
            </IonText>
          )}
          {success && <IonText color="success"  className="text-center ">{success}</IonText>}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ForgetPasswordPage;
