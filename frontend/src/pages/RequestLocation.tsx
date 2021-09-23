import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonSpinner,
} from '@ionic/react';
import { Cat } from '@api/cats';
import AdminCatCard from 'components/AdminCatCard';
import { useCats } from 'hooks/useCats';
import { useMemo } from 'react';

const RequestLocation: React.FC = () => {
  const { cats, isLoading } = useCats();

  const pageContent = useMemo(() => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center h-full mx-5 my-5">
          <IonSpinner />
        </div>
      );
    } else {
      return (
        <div className="flex flex-col items-center justify-start w-full h-auto px-4 my-5 space-y-4">
          {(cats as Cat[]).map((cat) => (
            <div className="w-full max-w-xl">
              <AdminCatCard key={cat.id} cat={cat} cardColor="bg-secondary-200" />
            </div>
          ))}
        </div>
      );
    }
  }, [isLoading, cats]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle>Request cat location</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>{pageContent}</IonContent>
    </IonPage>
  );
};
export default RequestLocation;
