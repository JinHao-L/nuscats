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
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

/* Tailwind Setup */
import 'tailwindcss/tailwind.css';
import './theme/tailwind.css';

/* MapBox Setup */
import 'mapbox-gl/dist/mapbox-gl.css';
import './theme/tailwind.css';
import {
  EMAIL_CONFIRM_ROUTE,
  FORGET_PASSWORD_ROUTE,
  LANDING_ROUTE,
  MAP_ROUTE,
  PASSWORD_RESET_ROUTE,
  RESEND_EMAIL_ROUTE,
  ROOT_ROUTE,
} from 'app/routes';
import ForgetPasswordPage from 'pages/ForgetPassword';
import EmailConfirmationPage from 'pages/EmailConfirmation';
import ResetPasswordPage from 'pages/ResetPassword';
import ResendConfirmationPage from 'pages/ResendConfirmation';
import { useEffect, useMemo } from 'react';
import { useNotification } from 'hooks/useNotification';
import useAuth from 'hooks/useAuth';

const App: React.FC = () => {
  const [present] = useIonToast();
  const { subscribe, onNotification } = useNotification();

  useEffect(() => {
    subscribe().catch((err) => console.log(err));

    const unsubscribe = onNotification((payload) => {
      const message = payload.data;
      present({
        header: `New notification - ${message?.title}`,
        message: message?.body || '',
        duration: 3000,
        translucent: true,
        position: 'top',
      });
    });

    return () => unsubscribe();
  }, []);


  const { isLoggedIn } = useAuth();

  const redirect = useMemo(() => {
    return (isLoggedIn
      ? <Redirect to={MAP_ROUTE} />
      : <Redirect to={LANDING_ROUTE} />
    )
  },
    [isLoggedIn]
  )

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path={LANDING_ROUTE} component={Landing} />
          <Route
            exact
            path={RESEND_EMAIL_ROUTE}
            component={ResendConfirmationPage}
          />
          <Route
            exact
            path={EMAIL_CONFIRM_ROUTE}
            component={EmailConfirmationPage}
          />
          <Route
            exact
            path={PASSWORD_RESET_ROUTE}
            component={ResetPasswordPage}
          />
          <Route
            exact
            path={FORGET_PASSWORD_ROUTE}
            component={ForgetPasswordPage}
          />
          <Route path={ROOT_ROUTE} component={Tabs} />
          <Route render={() => redirect} />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
