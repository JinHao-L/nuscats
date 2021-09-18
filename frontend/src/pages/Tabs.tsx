import { matchPath, Redirect, Route, useLocation } from 'react-router-dom';
import {
  IonIcon,
  IonLabel,
  IonPage,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/react';
import { logoOctocat, map, personCircle } from 'ionicons/icons';
import HomeTab from './HomeTab';
import CatsTab from './CatsTab';
import { CAT_ROUTE, TAB3_ROUTE, MAP_ROUTE, FEED_ROUTE } from 'app/routes';
import Tab3 from './Tab3';
import CatDetailPage from './CatDetailPage';
import { useEffect, useState } from 'react';
import FeedTab from './FeedTab';

interface TabInfo {
  href: string;
  label: string;
  icon: string;
}

/**
 * List of routes that should have tabs hidden
 * 
 * Rationale: Navigating to outer navigator is laggy
 */
const SHOULD_HIDE_TABS = [
  { path: `${CAT_ROUTE}/:id`, exact: true, strict: false },
];

const Tabs: React.FC = () => {
  // const { showTabs } = useContext(UIContext);
  const [showTabs, setShowTabs] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const shouldHide = SHOULD_HIDE_TABS.reduce(
      (accum, route) => accum || matchPath(location.pathname, route) !== null,
      false,
    );

    if (shouldHide) {
      setShowTabs(false);
      return () => setShowTabs(true);
    }
  }, [location]);

  const tabs: TabInfo[] = [
    {
      href: MAP_ROUTE,
      label: 'Home',
      icon: map,
    },
    {
      href: CAT_ROUTE,
      label: 'Cats',
      icon: logoOctocat,
    },
    {
      href: '/tab3',
      label: 'Profile',
      icon: personCircle,
    },
  ];

  let tabStyle = showTabs ? undefined : { display: 'none' };

  return (
    <IonPage>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path={MAP_ROUTE} component={HomeTab} />
          <Route exact path={CAT_ROUTE} component={CatsTab} />
          <Route exact path={TAB3_ROUTE} component={Tab3} />
          <Route exact path={FEED_ROUTE} component={FeedTab} />
          <Route path={`${CAT_ROUTE}/:id(\\d+)`} component={CatDetailPage} />
          <Route render={() => <Redirect to={MAP_ROUTE} />} />
        </IonRouterOutlet>

        <IonTabBar slot="bottom" className="py-2" style={tabStyle}>
          {tabs.map((tab, idx) => (
            <IonTabButton key={idx} tab={`tab-${idx}`} href={tab.href}>
              <IonIcon icon={tab.icon} />
              <IonLabel className="font-semibold tracking-wide">
                {tab.label}
              </IonLabel>
            </IonTabButton>
          ))}
        </IonTabBar>
      </IonTabs>
    </IonPage>
  );
};

export default Tabs;
