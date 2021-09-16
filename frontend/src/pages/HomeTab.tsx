import { IonContent, IonModal, IonPage } from '@ionic/react';
import CameraFab from 'components/map/CameraFab';
import LocationFab from 'components/map/LocationFab';
import Map from 'components/map/Map';
import SightingsForm from 'components/map/form/SightingsForm';
import UserIcon from 'components/map/UserIcon';
import useGeolocation, { getCenter } from 'hooks/useGeolocation';
import { useEffect, useRef, useState } from 'react';
import { State } from 'react-mapbox-gl/lib/map';
import { takePhoto, UserPhoto } from 'utils/takePhoto';

const HomeTab: React.FC = () => {
  /**
   * Map locationing
   */
  const coords = useGeolocation();
  const [isCentered, setIsCentered] = useState<boolean>(false);
  const mapRef = useRef<State>();

  /**
   * Creating a new sighting
   */
  const [showForm, setShowForm] = useState<boolean>(false);
  const [photo, setPhoto] = useState<UserPhoto>();

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

  const newSighting = async () => {
    try {
      const photo = await takePhoto();
      console.log(photo);
      setPhoto(photo);
      setShowForm(true);
      console.log('end');
    } catch (e) {
      console.log(e);
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
        <CameraFab onClick={newSighting} />
        <LocationFab
          disabled={isCentered && Boolean(coords)}
          onClick={centerMapToUser}
        />
        {photo && (
          <IonModal isOpen={showForm}>
            <SightingsForm photo={photo} onDismiss={() => setShowForm(false)} />
          </IonModal>
        )}
      </IonContent>
    </IonPage>
  );
};

export default HomeTab;
