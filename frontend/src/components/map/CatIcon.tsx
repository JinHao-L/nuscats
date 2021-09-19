import { IonIcon, IonLabel } from '@ionic/react';
import { Point } from 'geojson';
import { location } from 'ionicons/icons';
import { Marker } from 'react-mapbox-gl';

type CatIconProps = {
  point: Point | undefined;
  catName?: string;
  onClick?: () => void;
};

const CatIcon: React.FC<CatIconProps> = ({
  onClick,
  point,
  catName = 'Unknown Cat',
}) => {
  if (!point) return null;

  return (
    <Marker
      onClick={onClick}
      coordinates={[point.coordinates[1], point.coordinates[0]]}
    >
      <div className="flex flex-col items-center">
        <IonLabel className="px-2 text-base font-bold bg-white rounded-lg">
          🐱{catName}
        </IonLabel>
        <IonIcon color="primary" className="text-5xl" icon={location}></IonIcon>
      </div>
    </Marker>
  );
};

export default CatIcon;
