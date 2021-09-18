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
import CatDetailPage from './CatDetailPage';

interface TabInfo {
    href: string
    label: string
    icon: string
}

const Tabs: React.FC = () => {
    const tabs: TabInfo[] = [
        {
            href: "/home",
            label: "Home",
            icon: triangle
        },
        {
            href: "/cats",
            label: "Cats",
            icon: ellipse
        },
        {
            href: "/tab3",
            label: "Tab 3",
            icon: square
        }
    ]

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
                    {tabs.map((tab, idx) =>
                        <IonTabButton key={idx} tab={`tab-${idx}`} href={tab.href}>
                            <IonIcon icon={tab.icon} />
                            <IonLabel className="font-semibold tracking-wide" >{tab.label}</IonLabel>
                        </IonTabButton>
                    )}
                </IonTabBar>

            </IonTabs>
        </IonPage>
    )
}

export default Tabs