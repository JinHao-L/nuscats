import { IonContent, IonPage } from '@ionic/react';
import CameraFab from 'components/map/CameraFab';
import LocationFab from 'components/map/LocationFab';
import Map from 'components/map/Map';
import UserIcon from 'components/map/UserIcon';
import useGeolocation, { getCenter } from 'hooks/useGeolocation';
import { useEffect, useRef, useState } from 'react';
import { State } from 'react-mapbox-gl/lib/map';

const HomeTab: React.FC = () => {
  const coords = useGeolocation();
  const [isCentered, setIsCentered] = useState<boolean>(false);

  const mapRef = useRef<State>();

  useEffect(() => {
    resizeMap();
    centerMapToUser();
  }, [mapRef.current]);

  const resizeMap = (): void => {
    // This fixes an issue where the map is not immediately
    // full size on refresh
    if (mapRef.current && mapRef.current.map) {
      mapRef.current.map.resize();
    }
  };

  const centerMapToUser = (): void => {
    if (mapRef.current && mapRef.current.map && coords) {
      mapRef.current.map.flyTo({
        center: getCenter(coords),
      });
      setIsCentered(true);
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <Map
          onDragStart={() => setIsCentered(false)}
          getRef={(s) => (mapRef.current = s)}
          className="h-full v-full"
          style="mapbox://styles/mapbox/streets-v10"
        >
          <UserIcon coords={coords} />
        </Map>
        <CameraFab />
        <LocationFab
          disabled={isCentered && Boolean(coords)}
          onClick={centerMapToUser}
        />
      </IonContent>
    </IonPage>
  );
};

export default HomeTab;
