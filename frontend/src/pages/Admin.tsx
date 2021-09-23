import { IonContent, IonIcon, IonPage, IonRouterLink } from '@ionic/react';
import {
  ALERT_CATS_ROUTE,
  EDIT_CATS_ROUTE,
  REQUEST_LOCATION_ROUTE,
} from 'app/routes';
import NavBar from 'components/NavBar';
import { alertCircle, compass, create } from 'ionicons/icons';

const Admin: React.FC = () => {
  return (
    <IonPage>
      <NavBar title="Admin Actions" />
      <IonContent>
        <div className="flex flex-col items-center w-full h-full px-4 mt-5">
          <IonRouterLink
            className="w-full max-w-xl"
            routerLink={ALERT_CATS_ROUTE}
            routerDirection={'forward'}
          >

            <button className="flex items-center w-full h-32 px-4 mb-5 bg-gray-200 border-2 border-solid shadow-xl border-primary-300 active:bg-gray-300 rounded-2xl sm:h-40">
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
            className="w-full max-w-xl"
            routerLink={REQUEST_LOCATION_ROUTE}
            routerDirection={'forward'}
          >
            <button className="flex items-center w-full h-32 px-4 mb-5 bg-gray-200 border-2 border-solid shadow-xl active:bg-gray-300 border-secondary-300 rounded-2xl sm:h-40">
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
            className="w-full max-w-xl"
            routerLink={EDIT_CATS_ROUTE}
            routerDirection={'forward'}
          >
            <button className="flex items-center w-full h-32 px-4 mb-5 bg-gray-200 border-2 border-solid shadow-xl active:bg-gray-300 rounded-2xl border-tertiary-300 sm:h-40">
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
