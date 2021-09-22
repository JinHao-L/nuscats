import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonLoading,
	useIonAlert,
} from '@ionic/react';
import TextInput from 'components/map/form/TextInput';
import { changeUsername } from 'lib/auth';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

type ChangeUNameInputs = {
	username: string
}

const ChangeUsername: React.FC = () => {
	const [showAlert] = useIonAlert()
	const { register, handleSubmit, formState: { errors } } = useForm<ChangeUNameInputs>()

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<Boolean>();


	const onSubmit: SubmitHandler<ChangeUNameInputs> = async data => {
		setLoading(true);
		const response = await changeUsername(data.username)
		setLoading(false);
    console.log(response)
    if (response.err) {
      showAlert(response.err, [{ text: 'Ok' }]);
      setSuccess(false);
    } else if (response.message) {
      showAlert(response.message, [{ text: 'Ok' }]);
      setSuccess(true);
    }
	}

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Change username</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <form className="h-full mt-10" onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            id="username"
            type="text"
            label="Username"
            register={register('username', { required: true })}
            errors={[
              {
                isError: errors.username?.type === 'required',
                msg: 'Username is required',
              },
              {
                isError: errors.username?.type === 'minLength',
                msg: 'Username must be at least 4 characters long',
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
            Update username
          </IonButton>
        </form>
        <IonLoading isOpen={loading} message={'Please wait...'} />
      </IonContent>
    </IonPage>
  );
};

export default ChangeUsername;
