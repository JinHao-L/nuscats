import { makeCat, UniversityZone } from '@api/cats';
import { CatSighting, makeSighting, SightingType } from '@api/sightings';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonList,
  IonPage,
  IonTitle,
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
      description:
        'A cat in its natural habitat 😺A cat in its natural habitat 😺A cat in its natural habitat 😺A cat in its natural habitat 😺',
      location: { type: 'Point', coordinates: [1, 2, 3] },
      type: SightingType.CatSighted,
      cat: makeCat({
        id: 3,
        name: 'Ashy',
        description:
          'I sleep most of the day for a very good excuse- that’s what I’m wired to do! When most of you are just waking up, or rushing for that 8am tutorial, I am starting the day with a snooze. You might pass me by on the way to the UTown bus stop, at the steps outside UTR. You can probably approach me quietly for a little pat and rub, but please don’t poke me awake – I need my catnaps.',
        zone: UniversityZone.Utown,
      }),
    }),
    makeSighting({
      id: 1,
      image: 'https://placekitten.com/1001/1000',
      description: "Cat looks like it's injured 😿",
      location: { type: 'Point', coordinates: [1, 2, 3] },
      type: SightingType.Emergency,
      cat: makeCat({
        id: 1,
        name: 'Garfield',
        neutered: false,
        one_liner: 'Fluffy bowling ball',
        description:
          'I am a strong and healthy boy! I have black and white fur and I love to sleep :)',
        zone: UniversityZone.Arts,
      }),
    }),
  ];

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

        <IonList>
          {sightings.map((sighting, idx) => (
            <FeedCard key={idx} sighting={sighting} />
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default FeedTab;
