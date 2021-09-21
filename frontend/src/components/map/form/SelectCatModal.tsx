import { Cat } from '@api/cats';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import BaseCatCard from 'components/BaseCatCard';
import { close } from 'ionicons/icons';

type SelectCatModalProps = {
  onDismiss: () => void;
  onSelect: (id: number) => void;
  cats: Cat[];
};

const SelectCatModal = ({ onSelect, onDismiss, cats }: SelectCatModalProps) => {
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
