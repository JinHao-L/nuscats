import { CatSighting, makeSighting, SightingType } from '@api/sightings';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonList,
  IonPage,
  IonText,
  IonToolbar,
} from '@ionic/react';
import { MAP_ROUTE } from 'app/routes';
import FeedCard from 'components/FeedCard';
import { map } from 'ionicons/icons';

const FeedTab: React.FC = () => {
  const sightings: CatSighting[] = [
    makeSighting({
      id: 1,
      image: 'https://placekitten.com/1000/1000',
      description: 'A cat in its natural habitat 😺',
      location: { type: 'Point', coordinates: [1, 2, 3] },
      type: SightingType.CatSighted,
    }),
    makeSighting({
      id: 1,
      image: 'https://placekitten.com/1001/1000',
      description: "Cat looks like it's injured 😿",
      location: { type: 'Point', coordinates: [1, 2, 3] },
      type: SightingType.Emergency,
    }),
  ];

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar />
        <IonToolbar className="px-2">
          <IonText className="text-4xl font-bold">Activity Feed</IonText>
          <br />
          <IonText className="px-1 text-lg font-medium text-gray-500">
            Explore cat sightings
          </IonText>
          <IonButtons slot="end">
            <IonButton color="secondary" slot="start" routerLink={MAP_ROUTE}>
              <IonIcon icon={map} size={'large'} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {sightings.map((sighting) => (
            <FeedCard sighting={sighting} />
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default FeedTab;
