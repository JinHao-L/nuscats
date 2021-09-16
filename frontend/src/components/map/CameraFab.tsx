import { IonFab, IonFabButton, IonIcon } from '@ionic/react';
import { camera } from 'ionicons/icons';

const CameraFab = () => {
  return (
    <IonFab
      className="mb-5 mr-5"
      slot="fixed"
      vertical="bottom"
      horizontal="end"
    >
      <IonFabButton>
        <IonIcon icon={camera} />
      </IonFabButton>
    </IonFab>
  );
};

export default CameraFab;
