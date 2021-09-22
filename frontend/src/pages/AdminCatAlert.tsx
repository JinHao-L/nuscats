import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { ADMIN_ROUTE } from 'app/routes';
import ErrorMessage from 'components/ErrorMessage';
import FeedCard from 'components/FeedCard';
import { useAlertSightings } from 'hooks/useSightings';

const AdminCatAlert = () => {
  const { sightings, error, mutate, isLoading } = useAlertSightings();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <IonSpinner />
      </div>
    );
  }

  const renderBody = () => {
    if (error || !sightings) {
      return <ErrorMessage />;
    } else {
      if (sightings.length === 0) {
        return (
          <div className="flex items-center justify-center h-full">
            <p className="text-xl font-medium text-gray-800">No sightings 😿</p>
          </div>
        );
      } else {
        return (
          <IonList>
            {sightings.map((sighting) => (
              <FeedCard
                key={sighting.id}
                sighting={sighting}
                cat={sighting.cat}
                owner={sighting.owner}
                onDelete={mutate}
              />
            ))}
          </IonList>
        );
      }
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref={ADMIN_ROUTE} />
          </IonButtons>
          <IonTitle>Manage Cat Alerts</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense" className="ion-no-border">
          <IonToolbar mode="md">
            <IonTitle className="ion-text-left">
              <div className="text-3xl font-bold text-left">Cat Alerts</div>
              <div className="text-base font-medium text-left text-gray-500">
                Manage new cats and emergency reports
              </div>
            </IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonRefresher
          slot="fixed"
          onIonRefresh={async ({ target }) => {
            mutate();
            setTimeout(() => {
              (target as HTMLIonInfiniteScrollElement).complete();
            }, 1000);
          }}
        >
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        {renderBody()}
      </IonContent>
    </IonPage>
  );
};

export default AdminCatAlert;
