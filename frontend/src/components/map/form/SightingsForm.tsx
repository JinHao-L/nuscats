import {
  IonButton,
  IonHeader,
  IonIcon,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { arrowBack, close } from 'ionicons/icons';
import { useState } from 'react';
import { UserPhoto } from 'utils/takePhoto';
import SelectCategory from './SelectCategory';

type SightingsFormProps = {
  onDismiss: () => void;
  photo: UserPhoto;
};

enum State {
  SelectingCategory,
  Sighting,
  Emergency,
}

const SightingsForm = ({ onDismiss, photo }: SightingsFormProps) => {
  const [state, setState] = useState<State>(State.SelectingCategory);

  const title = (state: State) => {
    switch (state) {
      case State.SelectingCategory:
        return <IonTitle>Choose a category</IonTitle>;
      case State.Sighting:
        return <IonTitle>Cat Sighting!</IonTitle>;
      case State.Emergency:
        return <IonTitle>Emergency!</IonTitle>;
    }
  };

  return (
    <div className="flex flex-col flex-grow">
      <IonHeader>
        <IonToolbar>
          {state !== State.SelectingCategory && (
            <IonButton
              fill="clear"
              slot="start"
              onClick={() => setState(State.SelectingCategory)}
            >
              <IonIcon icon={arrowBack} />
            </IonButton>
          )}
          <IonButton fill="clear" slot="end" onClick={onDismiss}>
            <IonIcon icon={close} />
          </IonButton>
          {title(state)}
        </IonToolbar>
      </IonHeader>
      {state === State.SelectingCategory && (
        <SelectCategory
          selectSighting={() => setState(State.Sighting)}
          selectEmergency={() => setState(State.Emergency)}
        />
      )}
    </div>
  );
};

export default SightingsForm;
