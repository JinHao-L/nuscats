import { IonContent, IonIcon, IonPage, IonRouterLink } from '@ionic/react';
import {
  ALERT_CATS_ROUTE,
  BROADCAST_ANNOUNCEMENT_ROUTE,
  EDIT_CATS_ROUTE,
  REQUEST_LOCATION_ROUTE,
} from 'app/routes';
import NavBar from 'components/NavBar';
import { alertCircle, compass, create, megaphone } from 'ionicons/icons';

const Admin: React.FC = () => {
  return (
    <IonPage>
      <NavBar title="Admin Actions" />
      <IonContent>
        <div className="flex flex-col mx-5 mt-5">
          <IonRouterLink
            routerLink={ALERT_CATS_ROUTE}
            routerDirection={'forward'}
          >
            <button className="flex items-center w-full h-40 px-4 mb-5 shadow-xl active:bg-primary-400 bg-primary-300 rounded-2xl bg-opacity-90">
              <IonIcon
                icon={alertCircle}
                className="w-32 mr-2 text-black text-7xl"
              />
              <p className="w-full text-xl font-semibold text-left text-black">
                Cat Alerts
              </p>
            </button>
          </IonRouterLink>
          <IonRouterLink
            routerLink={REQUEST_LOCATION_ROUTE}
            routerDirection={'forward'}
          >
            <button className="flex items-center w-full h-40 px-4 mb-5 shadow-xl active:bg-secondary-500 bg-secondary-400 rounded-2xl bg-opacity-90">
              <IonIcon
                icon={compass}
                className="w-32 mr-2 text-black text-7xl"
              />
              <p className="w-full text-xl font-semibold text-left text-black">
                Request cat location
              </p>
            </button>
          </IonRouterLink>
          <IonRouterLink
            routerLink={EDIT_CATS_ROUTE}
            routerDirection={'forward'}
          >
            <button className="flex items-center w-full h-40 px-4 mb-5 shadow-xl active:bg-tertiary-400 bg-tertiary-300 rounded-2xl bg-opacity-90">
              <IonIcon
                icon={create}
                className="w-32 mr-2 text-black text-7xl"
              />
              <p className="w-full text-xl font-semibold text-left text-black">
                Edit/Add cats
              </p>
            </button>
          </IonRouterLink>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Admin;
