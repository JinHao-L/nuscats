import { Cat } from '@api/cats';
import { QuerySightingOrderBy } from '@api/sightings';
import { close } from 'ionicons/icons';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonPage,
  IonIcon,
} from '@ionic/react';
import FeedList from './FeedList';

interface FeedModalProps {
  dismiss: () => void;
  cat: Cat | undefined;
}

const FeedModal: React.FC<FeedModalProps> = ({ dismiss, cat }) => {
  if (cat === undefined) {
    return null;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{cat.name}'s Activity</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={dismiss}>
              <IonIcon icon={close} color="primary" size="large" />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <FeedList
          queryParams={{
            includeCatsData: false,
            includeOwnerData: true,
            catIds: [cat.id],
            orderBy: QuerySightingOrderBy.TIME,
          }}
          cat={cat}
        />
      </IonContent>
    </IonPage>
  );
};
export default FeedModal;
