import { IonIcon } from '@ionic/react';
import { Coords, getCenter } from 'hooks/useGeolocation';
import { caretUpCircleOutline } from 'ionicons/icons';
import { Marker } from 'react-mapbox-gl';

type UserIconProps = {
  coords: Coords | undefined;
};

const UserIcon = ({ coords }: UserIconProps) => {
  if (!coords) return null;

  return (
    <Marker
      style={{ transform: `rotate(${coords.heading || 0}deg)` }}
      coordinates={getCenter(coords)}
    >
      <IonIcon
        color="primary"
        className="text-5xl"
        icon={caretUpCircleOutline}
      ></IonIcon>
    </Marker>
  );
};

export default UserIcon;
