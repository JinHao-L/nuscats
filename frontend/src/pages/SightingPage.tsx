import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
} from '@ionic/react';
import FeedCard from 'components/FeedCard';
import { useSingleSighting } from 'hooks/useSightings';
import { RouteComponentProps } from 'react-router';

type RouteProps = {
  id: string;
};

const SightingPage = ({ match, history }: RouteComponentProps<RouteProps>) => {
  const { sighting, error, isLoading } = useSingleSighting(
    Number.parseInt(match.params.id),
  );

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (!sighting || error) {
    history.replace('/');
    return <></>;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="flex flex-col items-center w-full">
          <FeedCard
            sighting={sighting}
            owner={sighting.owner}
            cat={sighting.cat}
          />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SightingPage;
