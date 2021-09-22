import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { Camera, CameraResultType } from '@capacitor/camera';
import {
  CHANGE_NAME_DP_ROUTE,
  CHANGE_PASSWORD_ROUTE,
  CHANGE_USERNAME_ROUTE,
} from 'app/routes';
import { exit } from 'ionicons/icons';
import { logout } from 'lib/auth';

const Settings: React.FC = () => {
  // Upload/take profile picture
  //const handleChangeProfilePic = async () => {
  //	try {
  //		const image  = await Camera.getPhoto({
  //			quality: 90,
  //			allowEditing: true,
  //			resultType: CameraResultType.Uri,
  //		});
  //		console.log(image);
  //	} catch (e) {
  //		console.log(e);
  //	}
  //}

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem button routerLink={CHANGE_USERNAME_ROUTE}>
            <IonLabel>Change username</IonLabel>
          </IonItem>
          <IonItem button routerLink={CHANGE_PASSWORD_ROUTE}>
            <IonLabel>Change password</IonLabel>
          </IonItem>
          <IonItem button routerLink={CHANGE_NAME_DP_ROUTE}>
            <IonLabel>Change full name/profile picture</IonLabel>
          </IonItem>
          <IonItem button onClick={logout}>
            <IonLabel color="danger">Logout</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Settings;
