import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonIcon,
  IonLabel,
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonSpinner,
  IonToolbar,
} from '@ionic/react';
import { refresh } from 'ionicons/icons';
import { MAP_ROUTE } from 'app/routes';
import { useLatestSightings } from 'hooks/useSightings';
import NavBar from 'components/NavBar';
import CatMap from 'components/map/CatMap';
import type { PinDetails } from 'components/map/CatMap';
import FeedList from 'components/FeedList';
import { QuerySightingOrderBy } from '@api/sightings';
import { useLocation, useHistory } from 'react-router';
import * as queryString from 'query-string';

const HomeTab: React.FC = () => {

  // page setup
  const mapPage = 'Map';
  const feedPage = 'Feed';
  const [currPage, setCurrPage] = useState<string>(mapPage);
  const contentRef = useRef<HTMLIonContentElement | null>(null);

  const mapShown = currPage === mapPage;
  const feedShown = currPage === feedPage;

  // refresh sightings
  const { mutate, isLoading } = useLatestSightings();
  const [showFeedback, toggleFeedback] = useState(false);

  const refreshSightings = useCallback(() => {
    mutate();
    toggleFeedback(true);
    const id = setTimeout(() => {
      toggleFeedback(false);
    }, 1000);

    return () => clearTimeout(id);
  }, [mutate, toggleFeedback]);

  // change pin location if nagivated to via query string
  const location = useLocation();
  const history = useHistory();
  const [mapPinDetails, setMapPinDetails] = useState<PinDetails | undefined>();

  useEffect(() => {
    if (location.pathname === MAP_ROUTE) {
      const query = queryString.parse(location.search);
      if (query.lat && query.lng) {
        setCurrPage(mapPage);
        setMapPinDetails({
          coords: [
            parseFloat(query.lng as string),
            parseFloat(query.lat as string),
          ],
          tag: query.tag as string,
        });
      }
    }
  }, [location]);

  return (
    <IonPage>
      <NavBar title={currPage}>
        <IonButtons slot="start">
          <IonButton
            className={
              'w-12 transition-opacity ' +
              (mapShown ? 'opacity-100' : 'opacity-0')
            }
            fill="clear"
            color="secondary"
            slot="start"
            size={'small'}
            onClick={refreshSightings}
            disabled={isLoading || feedShown}
          >
            {showFeedback || isLoading ? (
              <IonSpinner
                name="circular"
                color="secondary"
                className="w-5 h-5 "
              />
            ) : (
              <IonIcon slot="start" icon={refresh} />
            )}
          </IonButton>
        </IonButtons>
      </NavBar>
      <IonContent className="relative" ref={contentRef} scrollY={feedShown}>
        <IonToolbar color="light" className="absolute">
          <IonSegment
            color="dark"
            value={currPage}
            onIonChange={(e) => {
              if (e.detail.value !== currPage) {
                setCurrPage(e.detail.value || mapPage);
              }

              if (e.detail.value === feedPage) {
                history.replace(MAP_ROUTE);
              }

              if (e.detail.value === mapPage && contentRef) {
                contentRef.current?.scrollToTop();
              }
            }}
          >
            <IonSegmentButton value={mapPage}>
              <IonLabel>Map</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value={feedPage}>
              <IonLabel>Feed</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </IonToolbar>
        <div
          className={
            'absolute w-full top-11 h-map-content transform transition-all duration-200 ' +
            (mapShown
              ? 'opacity-100 translate-x-0'
              : 'opacity-0 -translate-x-2/3 pointer-events-none')
          }
        >
          <CatMap pinDetails={mapPinDetails} />
        </div>
        <div
          className={
            'absolute w-full top-11 h-map-content transform transition-all duration-200 ' +
            (feedShown
              ? 'opacity-100 translate-x-0'
              : 'opacity-0 translate-x-2/3 pointer-events-none')
          }
        >
          <FeedList
            queryParams={{
              includeCatsData: true,
              includeOwnerData: true,
              orderBy: QuerySightingOrderBy.TIME,
            }}
          />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default React.memo(HomeTab);
