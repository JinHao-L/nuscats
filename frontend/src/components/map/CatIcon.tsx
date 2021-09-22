import { SightingType } from '@api/sightings';
import { IonIcon, IonLabel } from '@ionic/react';
import { Point } from 'geojson';
import { location } from 'ionicons/icons';
import { Marker } from 'react-mapbox-gl';
import TimeAgo from 'timeago-react';

type CatIconProps = {
  point: Point | undefined;
  catName?: string;
  time?: Date;
  type: SightingType;
  onClick?: () => void;
};

const CatIcon: React.FC<CatIconProps> = ({
  onClick,
  point,
  type,
  time,
  catName,
}) => {
  if (!point) return null;

  const renderIcon = (type: SightingType, name?: string) => {
    if (type === SightingType.Emergency) {
      return <Emergency time={time} />;
    } else {
      if (name) {
        return <CatSighting time={time} catName={name} />;
      } else {
        return <NewCat time={time} />;
      }
    }
  };

  return (
    <Marker
      onClick={onClick}
      coordinates={[point.coordinates[1], point.coordinates[0]]}
    >
      {renderIcon(type, catName)}
    </Marker>
  );
};

type CatSightingProps = {
  catName: string;
  time?: Date;
};

const CatSighting = ({ time, catName }: CatSightingProps) => {
  return (
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
  );
};

type EmergencyProps = {
  time?: Date;
};

const Emergency = ({ time }: EmergencyProps) => {
  return (
    <div className="flex flex-col items-center animate-bounce">
      <IonLabel
        color="danger"
        className="px-2 py-1 text-base font-bold text-center bg-white bg-opacity-75 border rounded-lg shadow border-primary-200"
      >
        Emergency
        <br />
        <IonLabel className="text-sm font-normal text-gray-800">
          {time && <TimeAgo datetime={time} />}
        </IonLabel>
      </IonLabel>
      <IonIcon className="text-5xl text-red-500" icon={location}></IonIcon>
    </div>
  );
};

type NewCatProps = {
  time?: Date;
};

const NewCat = ({ time }: NewCatProps) => {
  return (
    <div className="flex flex-col items-center animate-bounce">
      <IonLabel
        color="secondary"
        className="px-2 py-1 text-base font-bold text-center bg-white bg-opacity-75 border rounded-lg shadow border-primary-200"
      >
        New Cat
        <br />
        <IonLabel className="text-sm font-normal text-gray-800">
          {time && <TimeAgo datetime={time} />}
        </IonLabel>
      </IonLabel>
      <IonIcon
        className="text-5xl text-secondary-500"
        icon={location}
      ></IonIcon>
    </div>
  );
};

export default CatIcon;
