import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
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
  PASSWORD_RESET_ROUTE,
  PROFILE_ROUTE,
  PROFILE_SETTINGS_ROUTE,
  RESEND_EMAIL_ROUTE,
  ROOT_ROUTE,
  SETUP_PROFILE_ROUTE,
  SIGNIN_ROUTE,
  SIGNUP_ROUTE,
} from 'app/routes';
import Profile from 'pages/Profile';
import Settings from 'pages/Settings';
import SetupProfile from 'pages/SetupProfile';
import ForgetPasswordPage from 'pages/ForgetPassword';
import EmailConfirmationPage from 'pages/EmailConfirmation';
import ResetPasswordPage from 'pages/ResetPassword';
import ResendConfirmationPage from 'pages/ResendConfirmation';

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path={SIGNUP_ROUTE} component={Signup} />
          <Route exact path={SIGNIN_ROUTE} component={Signin} />
          <Route exact path={LANDING_ROUTE} component={Landing} />
          <Route exact path={SETUP_PROFILE_ROUTE} component={SetupProfile} />
          <Route exact path={PROFILE_ROUTE} component={Profile} />
          <Route exact path={PROFILE_SETTINGS_ROUTE} component={Settings} />
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
          <Route path={ROOT_ROUTE} render={() => <Tabs />} />
          <Route render={() => <Redirect to={LANDING_ROUTE} />} />
        </IonRouterOutlet >
      </IonReactRouter >
    </IonApp >
  );
};

export default App;
