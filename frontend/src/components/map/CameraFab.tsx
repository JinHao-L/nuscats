import { IonFab, IonFabButton, IonIcon } from '@ionic/react';
import { camera } from 'ionicons/icons';

type CameraFabProps = {
  onClick: () => void;
};

const CameraFab = ({ onClick }: CameraFabProps) => {
  return (
    <IonFab
      className="mb-5 mr-5"
      slot="fixed"
      vertical="bottom"
      horizontal="end"
    >
      <IonFabButton onClick={onClick}>
        <IonIcon icon={camera} />
      </IonFabButton>
    </IonFab>
  );
};

export default CameraFab;
