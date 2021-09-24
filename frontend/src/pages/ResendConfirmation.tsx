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
import { resendConfirmation } from 'lib/auth';
import React, { useState } from 'react';

type ResendConfirmationInputs = {
  email: string;
};

const ResendConfirmationPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showAlert] = useIonAlert();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResendConfirmationInputs>();

  const onSubmit: SubmitHandler<ResendConfirmationInputs> = async (
    data: ResendConfirmationInputs,
  ) => {
    setLoading(true);
    const response = await resendConfirmation(data.email);
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
        <div className="flex flex-col items-center space-y-6">
          <div className="m-5">
            <p className="mb-1 text-2xl font-semibold text-transparent bg-clip-text sm:text-3xl md:text-4xl bg-gradient-to-br from-primary-600 to-secondary-600">
              Resend email confirmation
            </p>
            <p className="tracking-wide text-gray-800">
              Didn't receive your confirmation mail?
              <br />
              Get one more on us 🐱
            </p>
          </div>
          <form className="flex flex-col w-full max-w-md px-6" onSubmit={handleSubmit(onSubmit)}>
            <TextInput
              id="email"
              type="email"
              label="Email"
              register={register('email', { required: true })}
              errors={[{ isError: !!errors.email, msg: 'Email is required' }]}
            />
            <IonButton
              className="px-5 text-white cursor-pointer text-md h-14"
              color="primary"
              expand="block"
              type={'submit'}
              disabled={!!success}
            >
              Send confirmation email
            </IonButton>
          </form>
          <IonLoading isOpen={loading} message={'Please wait...'} />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ResendConfirmationPage;
