import { IonIcon, IonLabel } from '@ionic/react';
import { Point } from 'geojson';
import { location } from 'ionicons/icons';
import { Marker } from 'react-mapbox-gl';
import TimeAgo from 'timeago-react';

type CatIconProps = {
  point: Point | undefined;
  catName?: string;
  time?: Date;
  onClick?: () => void;
};

const CatIcon: React.FC<CatIconProps> = ({
  onClick,
  point,
  time,
  catName = 'Unknown Cat',
}) => {
  if (!point) return null;

  return (
    <Marker
      onClick={onClick}
      coordinates={[point.coordinates[1], point.coordinates[0]]}
    >
      <div className="flex flex-col items-center">
        <IonLabel className="px-2 py-1 text-base font-bold text-center bg-white bg-opacity-75 border rounded-lg shadow border-primary-200">
          🐱 {catName}
          <br />
          <IonLabel className="text-sm font-normal text-gray-800">
            {time && <TimeAgo datetime={time} />}
          </IonLabel>
        </IonLabel>
        <IonIcon color="primary" className="text-5xl" icon={location}></IonIcon>
      </div>
    </Marker>
  );
};

export default CatIcon;
