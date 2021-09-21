import { IonText } from '@ionic/react';

type ErrorMessageProps = {
  text?: string;
};

const ErrorMessage = ({ text }: ErrorMessageProps) => {
  return (
    <div className="flex flex-col flex-1 text-xl text-center align-middle">
      <div className="flex-1" />
      <IonText color="danger">
        {text ?? 'We encountered a network connection issue...'}
      </IonText>
      <div className="flex-1" />
    </div>
  );
};

export default ErrorMessage;
