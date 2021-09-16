import { Route, Redirect } from 'react-router-dom';
import {
  IonApp,
  IonRouterOutlet,
} from '@ionic/react';
import { Provider } from 'react-redux';
import { IonReactRouter } from '@ionic/react-router';
import HomeTab from './pages/HomeTab';
import CatsTab from './pages/CatsTab';
import Tab3 from './pages/Tab3';
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
import "./theme/tailwind.css"

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <IonApp>
        <IonReactRouter>
          <IonRouterOutlet>
            <Route exact path="/home">
              <HomeTab />
            </Route>
            <Route exact path="/cats">
              <CatsTab />
            </Route>
            <Route path="/tab3">
              <Tab3 />
            </Route>
            <Route exact path="/signup">
              <Signup />
            </Route>
            <Route exact path="/signin">
              <Signin />
            </Route>
            <Route exact path="/landing">
              <Landing />
            </Route>
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
            <Route path={"/cats/:id"} component={CatDetailPage} />
            <Route render={() => <Tabs />} />
          </IonRouterOutlet>
        </IonReactRouter>
      </IonApp>
    </Provider>
  );
}

export default App;
