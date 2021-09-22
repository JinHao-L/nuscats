import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonContent,
  IonButton,
  IonLoading,
  useIonAlert,
} from '@ionic/react';
import TextInput from 'components/form/TextInput';
import { useForm, SubmitHandler } from 'react-hook-form';
import { forgetPassword } from 'lib/auth';
import React, { useState } from 'react';

type ForgetPasswordInputs = {
  email: string;
};

const ForgetPasswordPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showAlert] = useIonAlert();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgetPasswordInputs>();

  const onSubmit: SubmitHandler<ForgetPasswordInputs> = async (data: ForgetPasswordInputs) => {
    setLoading(true);
    const response = await forgetPassword(data.email);
    setLoading(false);
    if (response.err) {
      showAlert(response.err, [{ text: 'Ok' }]);
    } else if (response.message) {
      setSuccess(true)
      showAlert(response.message, [{ text: 'Ok' }]);
    }
    setLoading(false);
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
          <p className="mb-1 text-2xl font-semibold text-transparent bg-clip-text sm:text-3xl md:text-4xl bg-gradient-to-br from-primary-600 to-secondary-600">
            Forget your password?
          </p>
          <p className="tracking-wide text-gray-800">
            No worries! We got your back 🐱
          </p>
        </div>
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            id="email"
            type="email"
            label="Email"
            register={register('email', { required: true })}
            errors={[{ isError: !!errors.email, msg: 'Email is required' }]}
          />
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
      </IonContent>
    </IonPage>
  );
};

export default ForgetPasswordPage;
