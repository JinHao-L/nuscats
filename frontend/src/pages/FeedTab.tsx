import { QuerySightingOrderBy } from '@api/sightings';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { MAP_ROUTE } from 'app/routes';
import FeedList from 'components/FeedList';
import { map } from 'ionicons/icons';

const FeedTab: React.FC = () => {
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
        <FeedList
          queryParams={{
            includeCatsData: true,
            includeOwnerData: true,
            orderBy: QuerySightingOrderBy.TIME,
          }}
        />
      </IonContent>
    </IonPage>
  );
};

export default FeedTab;
