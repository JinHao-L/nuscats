import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, useIonToast } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Landing from './pages/Landing';
import Tabs from 'pages/Tabs';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
// import '@ionic/react/css/padding.css';
// import '@ionic/react/css/float-elements.css';
// import '@ionic/react/css/text-alignment.css';
// import '@ionic/react/css/text-transformation.css';
// import '@ionic/react/css/flex-utils.css';
// import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

/* Tailwind Setup */
import 'tailwindcss/tailwind.css';
import './theme/tailwind.css';

/* MapBox Setup */
import 'mapbox-gl/dist/mapbox-gl.css';

import { LANDING_ROUTE, MAP_ROUTE, ROOT_ROUTE } from 'app/routes';
import { useEffect, useMemo } from 'react';
import { useNotification } from 'hooks/useNotification';
import useAuth from 'hooks/useAuth';
import UpdateAppRequester from 'components/UpdateAppRequester';
import OfflineToast from 'assets/OfflineToast';


const App: React.FC = () => {
  const [present] = useIonToast();
  const { onNotification, hasPermission, canSubscribe } = useNotification();

  useEffect(() => {
    if (hasPermission && canSubscribe) {
      const unsubscribe = onNotification((payload) => {
        const message = payload.data;
        present({
          header: `New notification - ${message?.title}`,
          message: message?.body || '',
          duration: 3000,
          position: 'top',
        });
      });

      return () => unsubscribe();
    }
  }, [onNotification, present, hasPermission, canSubscribe]);

  const { isLoggedIn } = useAuth();

  const redirect = useMemo(() => {
    return isLoggedIn ? (
      <Redirect to={MAP_ROUTE} />
    ) : (
      <Redirect to={LANDING_ROUTE} />
    );
  }, [isLoggedIn]);

  return (
    <IonApp>
      <UpdateAppRequester />
      <OfflineToast />
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path={LANDING_ROUTE} component={Landing} />
          <Route path={ROOT_ROUTE} component={Tabs} />
          <Route render={() => redirect} />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
