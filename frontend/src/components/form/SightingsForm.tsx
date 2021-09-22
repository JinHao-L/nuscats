import { SightingType } from '@api/sightings';
import {
  IonButton,
  IonHeader,
  IonIcon,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import ErrorMessage from 'components/ErrorMessage';
import { useCats } from 'hooks/useCats';
import { Coords } from 'hooks/useGeolocation';
import { arrowBack, close } from 'ionicons/icons';
import { useState } from 'react';
import { UserPhoto } from 'utils/takePhoto';
import InputInformation from './InputInformation';
import SelectCategory from './SelectCategory';

type SightingsFormProps = {
  onDismiss: () => void;
  onSightingCreate: () => void;
  photo: UserPhoto;
  coords: Coords;
};

enum State {
  SelectingCategory,
  Sighting,
  Emergency,
}

const SightingsForm = ({
  onSightingCreate,
  onDismiss,
  photo,
  coords,
}: SightingsFormProps) => {
  const [state, setState] = useState<State>(State.SelectingCategory);
  const { cats, error } = useCats();

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

  if (error) {
    return (
      <div className="flex flex-col flex-grow">
        <IonHeader>
          <IonToolbar>
            <IonButton fill="clear" slot="end" onClick={onDismiss}>
              <IonIcon icon={close} />
            </IonButton>
          </IonToolbar>
        </IonHeader>
        <ErrorMessage />
      </div>
    );
  }

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
      {[State.Emergency, State.Sighting].includes(state) && (
        <InputInformation
          sightingType={
            state === State.Emergency
              ? SightingType.Emergency
              : SightingType.CatSighted
          }
          cats={cats ?? []}
          photo={photo}
          onSightingCreate={onSightingCreate}
          dismiss={onDismiss}
          coords={coords}
        />
      )}
    </div>
  );
};

export default SightingsForm;
