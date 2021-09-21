import { IonIcon, IonLabel } from '@ionic/react';
import { Position } from 'geojson';
import { pin } from 'ionicons/icons';
import { Marker } from 'react-mapbox-gl';

type PinIconProps = {
  coords: Position | undefined;
  text: string | undefined;
  onClick?: () => void
};

const PinIcon: React.FC<PinIconProps> = ({ coords, text, onClick }) => {
  if (!coords) return null;

  return (
    <Marker coordinates={coords} onClick={onClick}>
      <div className="flex flex-col items-center">
        <IonIcon className="text-3xl" color="secondary" icon={pin} />
        {text && (
          <IonLabel className="px-2 text-base font-bold text-center rounded-lg shadow-md bg-primary-100">
            {text}
          </IonLabel>
        )}
      </div>
    </Marker>
  );
};

export default PinIcon;
