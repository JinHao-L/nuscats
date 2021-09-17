import { IonFab, IonFabButton, IonIcon } from '@ionic/react';
import { location } from 'ionicons/icons';

type LocationFabProps = {
  disabled: boolean;
  onClick: () => void;
};

const LocationFab = ({ disabled, onClick }: LocationFabProps) => {
  return (
    <IonFab className="mt-5 mr-5" slot="fixed" vertical="top" horizontal="end">
      <IonFabButton onClick={onClick} color="success" disabled={disabled}>
        <IonIcon icon={location} />
      </IonFabButton>
    </IonFab>
  );
};

export default LocationFab;
