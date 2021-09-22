import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
  IonButton,
  IonTitle,
  IonLoading,
  useIonAlert,
} from '@ionic/react';
import { FORGET_PASSWORD_ROUTE, LANDING_ROUTE, SIGNIN_ROUTE } from 'app/routes';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import * as QueryString from 'query-string';
import { resetPassword } from 'lib/auth';
import { useForm, SubmitHandler } from 'react-hook-form';
import TextInput from 'components/map/form/TextInput';

type ResetPassInputs = {
  password: string;
  confirmPassword: string;
};

const ResetPasswordPage: React.FC = () => {
  const location = useLocation();
  const history = useHistory();
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<Boolean>();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetPassInputs>();
  const [showAlert] = useIonAlert();

  useEffect(() => {
    const query = QueryString.parse(location.search);
    if (query.token) {
      setToken(query.token as string);
    } else {
      history.push(LANDING_ROUTE);
    }
  }, []);

  const onSubmit: SubmitHandler<ResetPassInputs> = async (
    data: ResetPassInputs,
  ) => {
    setLoading(true);
    const response = await resetPassword(token, data.password);
    setLoading(false);

    if (response.err) {
      showAlert(response.err, [{ text: 'Ok' }]);
      setSuccess(false);
    } else if (response.message) {
      showAlert(response.message, [{ text: 'Ok' }]);
      setSuccess(true);
      setTimeout(() => {
        history.replace(LANDING_ROUTE);
      }, 3000);
    }
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
        <form
          className="flex flex-col"
          onSubmit={success === undefined ? handleSubmit(onSubmit) : undefined}
        >
          <TextInput
            id="password"
            type="password"
            label="New password"
            register={register('password', { required: true, minLength: 8 })}
            errors={[
              {
                isError: errors.password?.type === 'required',
                msg: 'Password is required',
              },
              {
                isError: errors.password?.type === 'minLength',
                msg: 'Password must be at least 8 characters long',
              },
            ]}
          />
          <TextInput
            id="cfmPassword"
            type="password"
            label="Confirm new password"
            register={register('confirmPassword', {
              required: true,
              minLength: 8,
              validate: (val: string) => val === watch('password'),
            })}
            errors={[
              {
                isError: errors.confirmPassword?.type === 'required',
                msg: 'Please confirm your password',
              },
              {
                isError: errors.confirmPassword?.type === 'validate',
                msg: 'Passwords do not match',
              },
            ]}
          />
          <IonButton
            className="mx-5 text-lg text-white cursor-pointer h-14"
            color="primary"
            expand="block"
            type={success === undefined ? 'submit' : 'reset'}
            routerLink={
              success === true
                ? SIGNIN_ROUTE
                : success === false
                ? FORGET_PASSWORD_ROUTE
                : undefined
            }
            // routerDirection={'root'}
            disabled={loading}
          >
            {success === true
              ? 'Sign in'
              : success === false
              ? 'Request new link'
              : 'Reset Password'}
          </IonButton>
          {/* <input
            id="submit"
            className="mx-5 mt-1 text-lg font-medium text-white h-14 rounded-xl bg-primary-400"
            type={success ? undefined : 'submit'}
            disabled={!!success}
            value="Sign in"
          /> */}
        </form>
        <IonLoading isOpen={loading} message={'Please wait...'} />
      </IonContent>
    </IonPage>
  );
};

export default ResetPasswordPage;
