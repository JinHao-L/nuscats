import { RefresherEventDetail } from '@ionic/core';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { MAP_ROUTE } from 'app/routes';
import FeedCard from 'components/FeedCard';
import { useSightings } from 'hooks/useSightings';
import { map } from 'ionicons/icons';
import { useEffect, useCallback, useState } from 'react';

const FeedTab: React.FC = () => {
  const { sightings, error, mutate, isLoading, pageSize, setPageSize } =
    useSightings({ limit: 5, page: 1 });

  useEffect(() => {
    error && console.log({ error });
  }, [error]);

  const doRefreshSightings = useCallback(
    (event: CustomEvent<RefresherEventDetail>) => {
      mutate();
      setTimeout(() => {
        if (!isLoading) {
          event.detail.complete();
        }
      }, 1000);
    },
    [mutate, isLoading],
  );

  const doLoadMoreSightings = async (event: CustomEvent<void>) => {
    const originalPage = pageSize;
    const data = await setPageSize(originalPage + 1);
    
    const target = (event.target as HTMLIonInfiniteScrollElement);
    setTimeout(() => {
      target.complete();
      console.log(data)
      if (data && data.length === originalPage) {
        target.disabled = true
      }
    }, 1000)
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="px-2">
          <IonTitle className="px-1 text-lg font-medium text-gray-500">
            Activity Feed
          </IonTitle>
          <IonButtons slot="end" collapse={true}>
            <IonButton color="secondary" slot="start" routerLink={MAP_ROUTE}>
              <IonIcon icon={map} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen={true}>
        <IonHeader collapse="condense" className="ion-no-border">
          <IonToolbar mode="md">
            <IonTitle className="ion-text-left">
              <div className="text-3xl font-bold text-left">Activity Feed</div>
              <div className="text-base font-medium text-left text-gray-500">
                Explore cat sightings
              </div>
            </IonTitle>
            <IonButtons slot="end" collapse={true}>
              <IonButton color="secondary" slot="start" routerLink={MAP_ROUTE}>
                <IonIcon icon={map} size={'large'} />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <div>
          <IonRefresher slot="fixed" onIonRefresh={doRefreshSightings}>
            <IonRefresherContent></IonRefresherContent>
          </IonRefresher>
          {sightings && (
            <>
              <IonList>
                {sightings.map((sighting) => (
                  <FeedCard key={sighting.id} sighting={sighting} />
                ))}
              </IonList>
              <IonInfiniteScroll
                threshold="100px"
                onIonInfinite={doLoadMoreSightings}
              >
                <IonInfiniteScrollContent loadingText="Loading more kitty images..."></IonInfiniteScrollContent>
              </IonInfiniteScroll>
            </>
          )}
          {error && (
            <div className="flex items-center justify-center w-full h-full">
              <p className="font-medium text-red-600">
                Error loading cats, please try again
              </p>
            </div>
          )}
          {isLoading && (
            <div className="flex items-center justify-center w-full h-full">
              <IonSpinner />
            </div>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default FeedTab;
