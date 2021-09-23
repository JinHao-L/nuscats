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
            <button className="flex items-center w-full h-40 px-4 mb-5 bg-gray-200 border-2 border-solid shadow-xl border-primary-300 active:bg-gray-300 rounded-2xl">
              <IonIcon
                icon={alertCircle}
                className="w-32 mr-2 text-gray-800 text-7xl"
              />
              <p className="w-full text-xl font-semibold text-left text-gray-800">
                Cat Alerts
              </p>
            </button>
          </IonRouterLink>
          <IonRouterLink
            routerLink={REQUEST_LOCATION_ROUTE}
            routerDirection={'forward'}
          >
            <button className="flex items-center w-full h-40 px-4 mb-5 bg-gray-200 border-2 border-solid shadow-xl active:bg-gray-300 border-secondary-300 rounded-2xl">
              <IonIcon
                icon={compass}
                className="w-32 mr-2 text-gray-800 text-7xl"
              />
              <p className="w-full text-xl font-semibold text-left text-gray-800">
                Request cat location
              </p>
            </button>
          </IonRouterLink>
          <IonRouterLink
            routerLink={EDIT_CATS_ROUTE}
            routerDirection={'forward'}
          >
            <button className="flex items-center w-full h-40 px-4 mb-5 bg-gray-200 border-2 border-solid shadow-xl active:bg-gray-300 rounded-2xl border-tertiary-300">
              <IonIcon
                icon={create}
                className="w-32 mr-2 text-gray-800 text-7xl"
              />
              <p className="w-full text-xl font-semibold text-left text-gray-800">
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
