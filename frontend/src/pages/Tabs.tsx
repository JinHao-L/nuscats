import { Redirect, Route } from 'react-router-dom';
import {
    IonIcon,
    IonLabel,
    IonPage,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonTabs,
} from "@ionic/react"
import { ellipse, square, triangle } from 'ionicons/icons';
import HomeTab from './HomeTab';
import CatsTab from './CatsTab';
import Tab3 from './Tab3';

const Tabs: React.FC = () => {
    return (
        <IonPage>
            <IonTabs>
                <IonRouterOutlet>
                    <Route exact path="/home" component={HomeTab} />
                    <Route exact path="/cats" component={CatsTab} />
                    <Route exact path="/tab3" component={Tab3} />
                    <Route>
                        <Redirect to="/home" />
                    </Route>
                </IonRouterOutlet>

                <IonTabBar slot="bottom">
                    <IonTabButton tab="tab1" href="/home">
                        <IonIcon icon={triangle} />
                        <IonLabel>Home</IonLabel>
                    </IonTabButton>
                    <IonTabButton tab="tab2" href="/cats">
                        <IonIcon icon={ellipse} />
                        <IonLabel>Cats</IonLabel>
                    </IonTabButton>
                    <IonTabButton tab="tab3" href="/tab3">
                        <IonIcon icon={square} />
                        <IonLabel>Tab 3</IonLabel>
                    </IonTabButton>
                </IonTabBar>

            </IonTabs>
        </IonPage>
    )
}

export default Tabs