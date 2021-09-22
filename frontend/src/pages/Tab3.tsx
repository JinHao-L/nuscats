import {
  IonContent,
  IonPage,
} from '@ionic/react';
import NavBar from 'components/NavBar';
import ExploreContainer from '../components/ExploreContainer';

const Tab3: React.FC = () => {
  return (
    <IonPage>
      <NavBar title="Tab 3" />
      <IonContent fullscreen>
        <ExploreContainer name="Tab 3 page" />
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
