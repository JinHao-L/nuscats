import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  useIonAlert,
  IonLoading,
} from '@ionic/react';
import TextInput from 'components/map/form/TextInput';
import { changePassword } from 'lib/auth';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

type ChangePasswordInputs = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

const ChangePassword: React.FC = () => {
  const [showAlert] = useIonAlert();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ChangePasswordInputs>();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<Boolean>();

  const onSubmit: SubmitHandler<ChangePasswordInputs> = async (data) => {
    setLoading(true);
    const response = await changePassword(data.oldPassword, data.newPassword);
    setLoading(false);

    if (response.err) {
      showAlert(response.err, [{ text: 'Ok' }]);
      setSuccess(false);
    } else if (response.message) {
      showAlert(response.message, [{ text: 'Ok' }]);
      setSuccess(true);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Change password</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <form className="h-full mt-10" onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            id="oldPassword"
            type="password"
            label="Current password"
            register={register('oldPassword', { required: true })}
            errors={[
              {
                isError: errors.oldPassword?.type === 'required',
                msg: 'Password is required',
              },
            ]}
          />
          <TextInput
            id="password"
            type="password"
            label="New password"
            register={register('newPassword', { required: true, minLength: 8 })}
            errors={[
              {
                isError: errors.newPassword?.type === 'required',
                msg: 'Password is required',
              },
              {
                isError: errors.newPassword?.type === 'minLength',
                msg: 'Password must be at least 8 characters long',
              },
            ]}
          />
          <TextInput
            id="cfmPassword"
            type="password"
            label="Confirm password"
            register={register('confirmPassword', {
              required: true,
              minLength: 8,
              validate: (val: string) => val === watch('newPassword'),
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
            type={'submit'}
            disabled={loading || success === true}
          >
            Update password
          </IonButton>
        </form>
        <IonLoading isOpen={loading} message={'Please wait...'} />
      </IonContent>
    </IonPage>
  );
};

export default ChangePassword;
