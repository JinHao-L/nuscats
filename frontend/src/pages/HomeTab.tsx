import { useEffect, useRef, useState } from 'react';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonModal,
  IonPage,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import CameraFab from 'components/map/CameraFab';
import LocationFab from 'components/map/LocationFab';
import Map from 'components/map/Map';
import SightingsForm from 'components/map/form/SightingsForm';
import UserIcon from 'components/map/UserIcon';
import useGeolocation, { getCenter } from 'hooks/useGeolocation';
import { State } from 'react-mapbox-gl/lib/map';
import { takePhoto, UserPhoto } from 'utils/takePhoto';
import { list, refresh } from 'ionicons/icons';
import { FEED_ROUTE } from 'app/routes';
import { useLatestSightings } from 'hooks/useSightings';
import CatIcon from 'components/map/CatIcon';
import { CatSighting } from '@api/sightings';
import FeedCard from 'components/FeedCard';
// import Modal from 'react-modal';

interface HomePageProps {
  router: HTMLIonRouterOutletElement | null;
}
const HomeTab: React.FC<HomePageProps> = ({ router }) => {
  /**
   * Map locationing
   */
  const coords = useGeolocation();
  const [isCentered, setIsCentered] = useState<boolean>(false);
  const mapRef = useRef<State>();
  const [catDetails, setCatDetails] = useState<CatSighting | null>(null);

  /**
   * Getting latest sightings
   */
  const { sightings, error, isLoading, mutate } = useLatestSightings();
  const [showFeedback, toggleFeedback] = useState(false);
  const [showModal, setShowModal] = useState(false);

  /**
   * Creating a new sighting
   */
  const [showForm, setShowForm] = useState<boolean>(false);
  const [photo, setPhoto] = useState<UserPhoto>();

  useEffect(() => {
    resizeMap();
    centerMapToUser();
  }, [mapRef.current]);

  useEffect(() => {
    if (!isLoading && !sightings) {
      console.log('Error loading sightings, please try again');
    } else {
      console.log(isLoading, sightings);
    }
  }, [isLoading, sightings]);

  const refreshSightings = () => {
    mutate();
    toggleFeedback(true);
    setTimeout(() => {
      toggleFeedback(false);
    }, 1000);
  };

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
      <IonHeader collapse="condense">
        <IonToolbar>
          <IonButtons slot="end">
            <IonButton
              fill="clear"
              color="secondary"
              slot="start"
              routerLink={FEED_ROUTE}
              routerDirection="forward"
              size={'small'}
            >
              <IonIcon slot="end" icon={list} />
            </IonButton>
          </IonButtons>
          <IonTitle>Map</IonTitle>
          <IonButtons slot="start">
            <IonButton
              fill="clear"
              color="secondary"
              slot="start"
              size={'small'}
              onClick={refreshSightings}
              disabled={isLoading}
            >
              {showFeedback && !isLoading ? (
                <IonSpinner name="circular" color="secondary" />
              ) : (
                <IonIcon slot="start" icon={refresh} />
              )}
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Map
          onDragStart={() => setIsCentered(false)}
          getRef={(s) => (mapRef.current = s)}
          className="h-full v-full"
          style="mapbox://styles/mapbox/streets-v10"
          onClick={() => setCatDetails(null)}
        >
          <>
            <UserIcon coords={coords} />
            {sightings?.map((sighting) => (
              <CatIcon
                key={sighting.id}
                point={sighting.location}
                catName={sighting.cat?.name}
                onClick={() => {
                  if (catDetails === sighting) {
                    setCatDetails(null);
                    setShowModal(false);
                  } else {
                    setCatDetails(sighting);
                    setShowModal(true);
                  }
                }}
              />
            ))}
            {/* {catDetails && <FeedCard className="z-50" sighting={catDetails} />} */}
            <IonModal
              isOpen={showModal}
              cssClass="my-custom-class"
              swipeToClose={true}
              presentingElement={router || undefined}
              onDidDismiss={() => setShowModal(false)}
            >
              {catDetails && <FeedCard className="z-50" sighting={catDetails} />}
            </IonModal>
            <CameraFab onClick={newSighting} />
            <LocationFab
              disabled={isCentered || !coords}
              onClick={centerMapToUser}
            />
          </>
        </Map>
        {/* {catDetails && (
          <Modal
            isOpen={catDetails !== null}
            onRequestClose={() => setCatDetails(null)}
          >
            <FeedCard sighting={catDetails} />
          </Modal>
        )} */}
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
