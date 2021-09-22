import { Cat, Profile } from '@api';
import { RefresherEventDetail } from '@ionic/core';
import {
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonList,
  IonRefresher,
  IonRefresherContent,
  IonSpinner,
} from '@ionic/react';
import FeedCard from 'components/FeedCard';
import { useSightings, UseSightingsOptions } from 'hooks/useSightings';
import { useEffect, useCallback } from 'react';

interface FeedListProps {
  queryParams?: UseSightingsOptions;
  cat?: Cat; // if provided dont make additional query
  user?: Profile;
}

const FeedList: React.FC<FeedListProps> = ({ queryParams = {}, cat, user }) => {
  const { sightings, error, mutate, isLoading, pageSize, setPageSize } =
    useSightings({ ...queryParams, limit: 5, page: 1 });

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

    const target = event.target as HTMLIonInfiniteScrollElement;
    setTimeout(() => {
      target.complete();
      if (data && data.length === originalPage) {
        target.disabled = true;
      }
    }, 1000);
  };

  return (
    <div className="h-full">
      <IonRefresher slot="fixed" onIonRefresh={doRefreshSightings}>
        <IonRefresherContent></IonRefresherContent>
      </IonRefresher>
      {sightings ? (
        <>
          {sightings.length === 0 && (
            <div className="flex items-center justify-center h-full">
              <p className="text-xl font-medium text-gray-800">
                No sightings 😿
              </p>
            </div>
          )}
          <IonList className="flex flex-col items-center">
            {sightings.map((sighting) => (
              <FeedCard
                key={sighting.id}
                sighting={sighting}
                cat={cat || sighting.cat}
                owner={user || sighting.owner}
                onDelete={mutate}
              />
            ))}
          </IonList>
          <IonInfiniteScroll
            threshold="100px"
            onIonInfinite={doLoadMoreSightings}
          >
            <IonInfiniteScrollContent loadingText="Fetching more kitty images..."></IonInfiniteScrollContent>
          </IonInfiniteScroll>
        </>
      ) : error ? (
        <div className="flex items-center justify-center w-full h-full">
          <p className="font-medium text-red-600">
            Error loading cats, please try again
          </p>
        </div>
      ) : isLoading ? (
        <div className="flex items-center justify-center w-full h-full">
          <IonSpinner />
        </div>
      ) : (
        <div className="flex items-center justify-center w-full h-full">
          <p className="font-medium">
            No one spotted {cat?.name || 'this cat'} recently
          </p>
        </div>
      )}
    </div>
  );
};

export default FeedList;
