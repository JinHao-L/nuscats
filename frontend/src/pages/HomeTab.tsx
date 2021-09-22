import { useEffect, useRef, useState } from 'react';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonModal,
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonSpinner,
  IonToolbar,
  useIonAlert,
} from '@ionic/react';
import CameraFab from 'components/map/CameraFab';
import LocationFab from 'components/map/LocationFab';
import Map from 'components/map/Map';
import SightingsForm from 'components/map/form/SightingsForm';
import UserIcon from 'components/map/UserIcon';
import useGeolocation, { getCenter } from 'hooks/useGeolocation';
import { State } from 'react-mapbox-gl/lib/map';
import { takePhoto, UserPhoto } from 'utils/takePhoto';
import { close, list, refresh } from 'ionicons/icons';
import { FEED_ROUTE, MAP_ROUTE } from 'app/routes';
import { useLatestSightings } from 'hooks/useSightings';
import CatIcon from 'components/map/CatIcon';
import { CatSighting } from '@api/sightings';
import FeedModal from 'components/FeedModal';
import { useHistory, useLocation } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import * as QueryString from 'query-string';
import PinIcon from 'components/map/PinIcon';
import FeedCard from 'components/FeedCard';
import NavBar from 'components/NavBar';
import { deleteSighting } from 'lib/sightings';
import { Result } from 'lib/api';

type HomePageProps = RouteComponentProps & {};

const HomeTab: React.FC<HomePageProps> = ({ match }) => {
  /**
   * Map locationing
   */
  const coords = useGeolocation();
  const [isCentered, setIsCentered] = useState<boolean>(false);
  const mapRef = useRef<State>();
  const [catDetails, setCatDetails] = useState<CatSighting | null>(null);
  const location = useLocation();
  const history = useHistory();
  const [pinnedLocation, setPinnedLocation] = useState<[number, number]>();
  const [pinnedTag, setPinnedTag] = useState<string>('');
  const routerRef = useRef(null);
  const [showAlert] = useIonAlert();

  /**
   * Getting latest sightings
   */
  const { sightings, isLoading, mutate } = useLatestSightings();
  const [showFeedback, toggleFeedback] = useState(false);
  const [showModal, setShowModal] = useState(false);
  console.log({ sightings });
  /**
   * Creating a new sighting
   */
  const [showForm, setShowForm] = useState<boolean>(false);
  const [photo, setPhoto] = useState<UserPhoto | null>();

  useEffect(() => {
    resizeMap();
    centerMapToUser();
  }, [mapRef.current]);

  useEffect(() => {
    const query = QueryString.parse(location.search);
    if (query.lat && query.lng) {
      setShowModal(false);
      const newPinLocation: [number, number] = [
        parseFloat(query.lng as string),
        parseFloat(query.lat as string),
      ];
      setPinnedLocation(newPinLocation);
      query.tag && setPinnedTag(query.tag as string);
      moveTo(newPinLocation);
      history.push(MAP_ROUTE);
    }
  }, [location?.search]);

  useEffect(() => {
    if (!isLoading && !sightings) {
      console.log('Error loading sightings, please try again');
    }
  }, [isLoading, sightings]);

  const refreshSightings = () => {
    mutate();
    toggleFeedback(true);
    setPinnedLocation(undefined);
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

  const moveTo = (point: [number, number]): void => {
    if (mapRef.current && mapRef.current.map && point) {
      mapRef.current.map.flyTo({
        center: point,
      });
      if (coords && point !== getCenter(coords)) {
        setIsCentered(false);
      }
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

  const onDeleteSighting = async () => {
    if (catDetails) {
      await deleteSighting(catDetails.id);
      mutate(
        (data) => ({
          ...(data as Result<CatSighting[]>),
          value: sightings?.filter((s) => s.id !== catDetails.id) || [],
        }),
        false,
      );
      setShowModal(false);
    }
  };

  return (
    <IonPage ref={routerRef}>
      <NavBar title="Map">
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
      </NavBar>
      <IonContent scrollY={false} className="relative">
        <IonToolbar color="light" className="absolute">
          <IonSegment color="dark" value="map">
            <IonSegmentButton value="map">
              <IonLabel>Map</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="feed">
              <IonLabel>Feed</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </IonToolbar>
        <Map
          onDragStart={() => setIsCentered(false)}
          getRef={(s) => (mapRef.current = s)}
          className="absolute w-full top-11 h-map-content"
          style="mapbox://styles/mapbox/streets-v10"
        >
          <>
            <UserIcon coords={coords} />
            {sightings?.map((sighting) => (
              <CatIcon
                key={sighting.id}
                point={sighting.location}
                catName={sighting.cat?.name}
                time={sighting.created_at}
                type={sighting.type}
                onClick={() => {
                  setCatDetails(sighting);
                  setShowModal(true);
                }}
              />
            ))}
            <PinIcon
              coords={pinnedLocation}
              text={pinnedTag}
              onClick={() => setPinnedLocation(undefined)}
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
        {catDetails?.cat && (
          <IonModal
            isOpen={showModal}
            swipeToClose={true}
            onDidDismiss={() => setShowModal(false)}
          >
            <FeedModal
              cat={catDetails.cat}
              dismiss={() => setShowModal(false)}
            />
          </IonModal>
        )}
        {catDetails && !catDetails.cat && (
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
                  cat={catDetails.cat}
                  sighting={catDetails}
                  owner={catDetails.owner}
                  onDelete={onDeleteSighting}
                />
              </IonContent>
            </div>
          </IonModal>
        )}
      </IonContent>
    </IonPage>
  );
};

export default HomeTab;
