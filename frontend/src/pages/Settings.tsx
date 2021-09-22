import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import {
  CHANGE_NAME_DP_ROUTE,
  CHANGE_PASSWORD_ROUTE,
  CHANGE_USERNAME_ROUTE,
  LANDING_ROUTE,
} from 'app/routes';
import useAuth from 'hooks/useAuth';
import { logout } from 'lib/auth';
import { useCallback } from 'react';
import { useHistory } from 'react-router';


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
  const { setLogout } = useAuth()
  const history = useHistory()

  const handleLogout = useCallback(() => {
    logout()
    setLogout()
    history.push(LANDING_ROUTE)

  }, [setLogout, history])


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
          <IonItem button onClick={handleLogout}>
            <IonLabel color="danger">Logout</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Settings;
