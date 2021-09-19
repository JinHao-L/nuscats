import { Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { Provider } from 'react-redux';
import { IonReactRouter } from '@ionic/react-router';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Landing from './pages/Landing';
import Tabs from 'pages/Tabs';
import CatDetailPage from 'pages/CatDetailPage';

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
import store from './app/store';

/* Tailwind Setup */
import 'tailwindcss/tailwind.css';
import './theme/tailwind.css';

/* MapBox Setup */
import 'mapbox-gl/dist/mapbox-gl.css';
import './theme/tailwind.css';
import {
  ADMIN_ROUTE,
  BROADCAST_ANNOUNCEMENT_ROUTE,
  CAT_ROUTE,
  CHANGE_PASSWORD_ROUTE,
  CHANGE_USERNAME_ROUTE,
  EDIT_CATS_ROUTE,
  LANDING_ROUTE,
  PROFILE_ROUTE,
  PROFILE_SETTINGS_ROUTE,
  REQUEST_LOCATION_ROUTE,
  SIGNIN_ROUTE,
  SIGNUP_ROUTE,
} from 'app/routes';
import ChangePassword from 'pages/ChangePassword';
import ChangeUsername from 'pages/ChangeUsername';
import Profile from 'pages/Profile';
import Settings from 'pages/Settings';
import Admin from 'pages/Admin';
import BroadcastAnnouncement from 'pages/BroadcastAnnouncement';
import RequestLocation from 'pages/RequestLocation';
import EditCatsList from 'pages/EditCatsList';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <IonApp>
        <IonReactRouter>
          <IonRouterOutlet>
            <Route exact path={SIGNUP_ROUTE} component={Signup} />
            <Route exact path={SIGNIN_ROUTE} component={Signin} />
            <Route exact path={LANDING_ROUTE} component={Landing} />
            <Route exact path={PROFILE_ROUTE} component={Profile} />
            <Route exact path={PROFILE_SETTINGS_ROUTE} component={Settings} />
            <Route
              exact
              path={CHANGE_USERNAME_ROUTE}
              component={ChangeUsername}
            />
            <Route
              exact
              path={CHANGE_PASSWORD_ROUTE}
              component={ChangePassword}
            />
            <Route exact path={LANDING_ROUTE} component={Landing} />
            <Route render={() => <Tabs />} />
          </IonRouterOutlet>
        </IonReactRouter>
      </IonApp>
    </Provider>
  );
};

export default App;
