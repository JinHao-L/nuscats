import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonSpinner,
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

  const header = () => {
    return (
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
    );
  };

  if (isLoading) {
    return (
      <IonPage>
        {header()}
        <div className="flex items-center justify-center flex-1 align-middle">
          <IonSpinner className="w-10 h-10" color="primary" />
        </div>
      </IonPage>
    );
  }

  if (!sighting || error) {
    history.replace('/');
    return <></>;
  }

  return (
    <IonPage>
      {header()}
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
