import { IonFab, IonFabButton, IonIcon } from '@ionic/react';
import { camera } from 'ionicons/icons';

type CameraFabProps = {
  onClick: () => void;
  disabled: boolean;
};

const CameraFab = ({ onClick, disabled }: CameraFabProps) => {
  return (
    <IonFab
      className="z-40 mb-5 mr-5"
      slot="fixed"
      vertical="bottom"
      horizontal="end"
    >
      <IonFabButton disabled={disabled} onClick={onClick}>
        <IonIcon icon={camera} />
      </IonFabButton>
    </IonFab>
  );
};

export default CameraFab;
