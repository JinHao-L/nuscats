import { IonIcon, IonLabel } from '@ionic/react';
import { Position } from 'geojson';
import { pin } from 'ionicons/icons';
import { Marker } from 'react-mapbox-gl';

type PinIconProps = {
  coords: Position | undefined;
  text: string | undefined;
  onClick?: () => void;
};

const PinIcon: React.FC<PinIconProps> = ({ coords, text, onClick }) => {
  console.log({ coords })
  if (!coords) return null;

  return (
    <Marker coordinates={coords} onClick={onClick}>
      <div className="flex flex-col items-center gap-1">
        {text && (
          <IonLabel className="px-2 py-1 text-base font-bold text-center bg-white bg-opacity-75 border rounded-lg shadow border-primary-200">
            {text}
          </IonLabel>
        )}
        <IonIcon className="text-3xl" color="secondary" icon={pin} />
      </div>
    </Marker>
  );
};

export default PinIcon;
