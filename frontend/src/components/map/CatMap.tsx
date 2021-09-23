import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonModal,
  IonToolbar,
  useIonAlert,
  useIonViewWillEnter,
} from '@ionic/react';
import CameraFab from 'components/map/CameraFab';
import LocationFab from 'components/map/LocationFab';
import Map from 'components/map/Map';
import SightingsForm from 'components/form/SightingsForm';
import UserIcon from 'components/map/UserIcon';
import useGeolocation, { getCenter } from 'hooks/useGeolocation';
import { State } from 'react-mapbox-gl/lib/map';
import { takePhoto, UserPhoto } from 'utils/takePhoto';
import { useAlertSightings, useLatestSightings } from 'hooks/useSightings';
import CatIcon from 'components/map/CatIcon';
import { CatSighting } from '@api/sightings';
import FeedModal from 'components/FeedModal';
import PinIcon from 'components/map/PinIcon';
import { close } from 'ionicons/icons';
import FeedCard from 'components/FeedCard';
import { useHistory } from 'react-router';
import { MAP_ROUTE } from 'app/routes';

export type PinDetails = {
  coords: [number, number];
  tag?: string;
};

type CatMapProps = {
  pinDetails?: PinDetails;
};

const CatMap: React.FC<CatMapProps> = ({ pinDetails: initialPinDetails }) => {
  /**
   * Map location
   */
  const coords = useGeolocation();
  const [isCentered, setIsCentered] = useState<boolean>(false);
  const mapRef = useRef<State>();
  const [catDetails, setCatDetails] = useState<CatSighting['id'] | null>(null);
  const [pinDetails, setPinDetails] = useState<PinDetails | undefined>(
    initialPinDetails,
  );
  const [showAlert] = useIonAlert();
  const history = useHistory()

  /**
   * Getting latest sightings
   */
  const latestSightings = useLatestSightings();
  const alertSightings = useAlertSightings();
  const isLoading = latestSightings.isLoading || alertSightings.isLoading;
  const [showModal, setShowModal] = useState(false);

  /**
   * Creating a new sighting
   */
  const [showForm, setShowForm] = useState<boolean>(false);
  const [photo, setPhoto] = useState<UserPhoto | null>();

  const moveTo = useCallback(
    (point: [number, number]): void => {
      if (mapRef.current && mapRef.current.map && point) {
        mapRef.current.map.flyTo({
          center: point,
        });
        if (coords && point !== getCenter(coords)) {
          setIsCentered(false);
        }
      }
    },
    [coords],
  );

  useIonViewWillEnter(() => {
    resizeMap();
  });

  useEffect(() => {
    setPinDetails(initialPinDetails);
    if (initialPinDetails) {
      moveTo(initialPinDetails.coords);
    }
  }, [initialPinDetails, moveTo]);

  useEffect(() => {
    if (latestSightings.error || alertSightings.error) {
      console.log('Error loading sightings, please try again');
    }
  }, [latestSightings, alertSightings]);

  const mutate = () => {
    latestSightings.mutate();
    alertSightings.mutate();
  };

  const uniqueSightings = useMemo(() => {
    let s: Record<string, CatSighting> = {};
    latestSightings.sightings?.forEach(
      (sighting) => (s[sighting.id] = sighting),
    );
    alertSightings.sightings?.forEach(
      (sighting) => (s[sighting.id] = sighting),
    );

    return Object.values(s);
  }, [latestSightings, alertSightings]);

  const currentSighting = useMemo(
    () => uniqueSightings.find((s) => s.id === catDetails),
    [catDetails, uniqueSightings],
  );

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
    if (!coords) {
      showAlert('Please enable location services first', [{ text: 'Ok' }]);
      return;
    }
    try {
      const photo = await takePhoto();
      setPhoto(photo);
      setShowForm(true);
    } catch (e) {
      console.log(e);
    }
  };

  const onDeleteSighting = (_: CatSighting) => {
    mutate();
    setShowModal(false);
  };

  const onUpdateSighting = (sighting: CatSighting) => {
    mutate();
    console.log(sighting);
  };

  return (
    <>
      <Map
        onDragStart={() => setIsCentered(false)}
        getRef={(s) => (mapRef.current = s)}
        className="w-full h-full"
        style="mapbox://styles/mapbox/streets-v10"
      >
        <>
          <UserIcon coords={coords} />
          {uniqueSightings.map((sighting) => (
            <CatIcon
              key={sighting.id}
              point={sighting.location}
              catName={sighting.cat?.name}
              time={sighting.created_at}
              type={sighting.type}
              onClick={() => {
                setCatDetails(sighting.id);
                setShowModal(true);
              }}
            />
          ))}
          <PinIcon
            coords={pinDetails?.coords}
            text={pinDetails?.tag}
            onClick={() => {
                setPinDetails(undefined);
                history.push(MAP_ROUTE)
            }}
          />
          <CameraFab onClick={newSighting} />
          <LocationFab
            disabled={isCentered || !coords}
            onClick={centerMapToUser}
          />
        </>
      </Map>
      {photo && coords && (
        <IonModal isOpen={showForm}>
          <SightingsForm
            photo={photo}
            onDismiss={() => {
              setPhoto(null);
              setShowForm(false);
            }}
            onSightingCreate={mutate}
            coords={coords}
          />
        </IonModal>
      )}
      {currentSighting?.cat && (
        <IonModal
          isOpen={showModal}
          swipeToClose={true}
          onDidDismiss={() => setShowModal(false)}
        >
          <FeedModal
            cat={currentSighting.cat}
            dismiss={() => setShowModal(false)}
          />
        </IonModal>
      )}
      {currentSighting && !currentSighting.cat && (
        <IonModal
          isOpen={showModal}
          swipeToClose={true}
          onDidDismiss={() => setShowModal(false)}
        >
          <div>
            <IonHeader>
              <IonToolbar>
                <IonButton
                  fill="clear"
                  slot="end"
                  onClick={() => setShowModal(false)}
                >
                  <IonIcon icon={close} />
                </IonButton>
              </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
              <FeedCard
                cat={currentSighting.cat}
                sighting={currentSighting}
                owner={currentSighting.owner}
                onDelete={onDeleteSighting}
                onCatUpdate={onUpdateSighting}
              />
            </IonContent>
          </div>
        </IonModal>
      )}
    </>
  );
};

export default CatMap;
