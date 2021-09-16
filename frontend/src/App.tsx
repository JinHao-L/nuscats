import { Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { Provider } from 'react-redux';
import { IonReactRouter } from '@ionic/react-router';
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

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <IonApp>
        <IonReactRouter>
          <IonRouterOutlet>
            <Route path={'/cats/:id'} component={CatDetailPage} />
            <Route render={() => <Tabs />} />
          </IonRouterOutlet>
        </IonReactRouter>
      </IonApp>
    </Provider>
  );
};

export default App;
