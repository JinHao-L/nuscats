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
import { construct, logoOctocat, map, personCircle } from 'ionicons/icons';
import HomeTab from './HomeTab';
import CatsTab from './CatsTab';
import {
  CAT_ROUTE,
  MAP_ROUTE,
  ADMIN_ROUTE,
  BROADCAST_ANNOUNCEMENT_ROUTE,
  REQUEST_LOCATION_ROUTE,
  EDIT_CATS_ROUTE,
  CHANGE_PASSWORD_ROUTE,
  CHANGE_USERNAME_ROUTE,
  PROFILE_ROUTE,
  PROFILE_SETTINGS_ROUTE,
  CHANGE_NAME_DP_ROUTE,
  ROOT_ROUTE,
  ALERT_CATS_ROUTE,
} from 'app/routes';
import CatDetailPage from './CatDetailPage';
import { useEffect, useMemo, useState } from 'react';
import Admin from './Admin';
import EditCatsList from './EditCatsList';
import RequestLocation from './RequestLocation';
import BroadcastAnnouncement from './BroadcastAnnouncement';
import ChangePassword from './ChangePassword';
import ChangeUsername from './ChangeUsername';
import Profile from './Profile';
import Settings from './Settings';
import ChangeNameAndDp from './ChangeNameAndDp';
import AdminCatAlert from './AdminCatAlert';
import useAuth from 'hooks/useAuth';
import { RoleType } from '@api/users';
import PrivateRoute from 'components/PrivateRoute';

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
  { path: BROADCAST_ANNOUNCEMENT_ROUTE, exact: true, strict: false },
  { path: REQUEST_LOCATION_ROUTE, exact: true, strict: false },
  { path: EDIT_CATS_ROUTE, exact: true, strict: false },
  { path: CHANGE_NAME_DP_ROUTE, exact: true, strict: false },
];

const Tabs: React.FC = () => {
  // const { showTabs } = useContext(UIContext);
  const [showTabs, setShowTabs] = useState(true);
  const location = useLocation();
  const { user, isLoggedIn } = useAuth();

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

  const isAdmin: boolean = useMemo(
    () => user?.roles?.includes(RoleType.Admin) || false,
    [user?.roles],
  );

  const tabs: TabInfo[] = useMemo(() => {
    const adminTab = {
      href: ADMIN_ROUTE,
      label: 'Admin',
      icon: construct,
    };
    const mapTab = {
      href: MAP_ROUTE,
      label: 'Home',
      icon: map,
    };
    const catsTab = {
      href: CAT_ROUTE,
      label: 'Cats',
      icon: logoOctocat,
    };

    if (isAdmin) {
      return [mapTab, catsTab, adminTab];
    } else {
      return [mapTab, catsTab];
    }
  }, [isAdmin]);

  let tabStyle = showTabs ? undefined : { display: 'none' };

  return (
    <IonPage>
      <IonTabs>
        <IonRouterOutlet basePath={ROOT_ROUTE}>
          <Route exact path={MAP_ROUTE} component={HomeTab} />
          <Route exact path={CAT_ROUTE} component={CatsTab} />
          <Route path={`${CAT_ROUTE}/:id(\\d+)`} component={CatDetailPage} />
          <PrivateRoute
            exact
            path={ADMIN_ROUTE}
            component={Admin}
            canRoute={isAdmin}
            elseRedirectTo={MAP_ROUTE}
          />
          <PrivateRoute
            exact
            path={BROADCAST_ANNOUNCEMENT_ROUTE}
            component={BroadcastAnnouncement}
            canRoute={isAdmin}
            elseRedirectTo={MAP_ROUTE}
          />
          <PrivateRoute
            exact
            path={REQUEST_LOCATION_ROUTE}
            component={RequestLocation}
            canRoute={isAdmin}
            elseRedirectTo={MAP_ROUTE}
          />
          <PrivateRoute
            exact
            path={EDIT_CATS_ROUTE}
            component={EditCatsList}
            canRoute={isAdmin}
            elseRedirectTo={MAP_ROUTE}
          />
          <Route exact path={PROFILE_ROUTE} component={Profile} />
          <Route exact path={PROFILE_SETTINGS_ROUTE} component={Settings} />
          <PrivateRoute
            exact
            path={ALERT_CATS_ROUTE}
            component={AdminCatAlert}
            canRoute={isAdmin}
            elseRedirectTo={MAP_ROUTE}
          />
          <PrivateRoute
            exact
            path={PROFILE_SETTINGS_ROUTE}
            component={Settings}
            canRoute={isLoggedIn}
            elseRedirectTo={MAP_ROUTE}
          />
          <PrivateRoute
            exact
            path={CHANGE_USERNAME_ROUTE}
            component={ChangeUsername}
            canRoute={isLoggedIn}
            elseRedirectTo={MAP_ROUTE}
          />
          <PrivateRoute
            exact
            path={CHANGE_PASSWORD_ROUTE}
            component={ChangePassword}
            canRoute={isLoggedIn}
            elseRedirectTo={MAP_ROUTE}
          />
          <PrivateRoute
            exact
            path={CHANGE_NAME_DP_ROUTE}
            component={ChangeNameAndDp}
            canRoute={isLoggedIn}
            elseRedirectTo={MAP_ROUTE}
          />
          <Route render={() => <Redirect to={MAP_ROUTE} />} />
        </IonRouterOutlet >

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
      </IonTabs >
    </IonPage >
  );
};

export default Tabs;
