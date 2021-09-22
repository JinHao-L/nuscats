import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import NavBar from 'components/NavBar';
import ExploreContainer from '../components/ExploreContainer';

const Tab3: React.FC = () => {
  return (
    <IonPage>
      <NavBar title="Tab 3" />
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 3</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Tab 3 page" />
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
