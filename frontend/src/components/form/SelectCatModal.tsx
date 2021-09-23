import { Cat } from '@api/cats';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import BaseCatCard from 'components/BaseCatCard';
import ErrorMessage from 'components/ErrorMessage';
import { useCats } from 'hooks/useCats';
import { close } from 'ionicons/icons';

type SelectCatModalProps = {
  onDismiss: () => void;
  onSelect: (cat: Cat) => void;
};

const SelectCatModal = ({ onSelect, onDismiss }: SelectCatModalProps) => {
  const { cats, error, isLoading } = useCats();

  if (isLoading) {
    return (
      <div className="flex flex-col flex-grow">
        <IonHeader>
          <IonToolbar>
            <IonButton fill="clear" slot="end" onClick={onDismiss}>
              <IonIcon icon={close} />
            </IonButton>
            <IonTitle>Select a cat</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonSpinner />
        </IonContent>
      </div>
    );
  }

  if (error || !cats) {
    return (
      <div className="flex flex-col flex-grow">
        <IonHeader>
          <IonToolbar>
            <IonButton fill="clear" slot="end" onClick={onDismiss}>
              <IonIcon icon={close} />
            </IonButton>
            <IonTitle>Select a cat</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <ErrorMessage />
        </IonContent>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-grow">
      <IonHeader>
        <IonToolbar>
          <IonButton fill="clear" slot="end" onClick={onDismiss}>
            <IonIcon icon={close} />
          </IonButton>
          <IonTitle>Select a cat</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {cats.map((cat) => (
          <div key={cat.id} className="m-2">
            <BaseCatCard cat={cat} onClick={onSelect} />
          </div>
        ))}
      </IonContent>
    </div>
  );
};

export default SelectCatModal;
