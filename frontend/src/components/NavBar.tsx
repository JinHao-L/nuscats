import {
  IonButton,
  IonButtons,
  IonHeader,
  IonIcon,
  IonItem,
  IonList,
  IonListHeader,
  IonRouterLink,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import {
  LANDING_ROUTE,
  PROFILE_ROUTE,
  SETUP_PROFILE_ROUTE,
  SIGNIN_ROUTE,
  SIGNUP_ROUTE,
} from 'app/routes';
import useAuth from 'hooks/useAuth';
import { useNotification } from 'hooks/useNotification';
import useOnClickOutside from 'hooks/useOnClickOutside';
import { list, notifications, notificationsOff } from 'ionicons/icons';
import { logout } from 'lib/auth';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useHistory } from 'react-router';

type NavBarProps = {
  title: string;
};

const NavBar: React.FC<NavBarProps> = ({ title, children }) => {
  const { isLoggedIn, shouldCreateProfile, setLogout } = useAuth();
  const {
    canSubscribe,
    hasPermission,
    subscribe: subscribeNotification,
    unsubscribe: unsubscribeNotification,
  } = useNotification();
  const [showDropdown, setShowDropDown] = useState<boolean>(false);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    setShowDropDown(false);
  }, [location]);

  useOnClickOutside(dropdownRef, () => setShowDropDown(false));

  const handleLogout = useCallback(() => {
    logout();
    setLogout();
    history.push(LANDING_ROUTE);
  }, [setLogout, history]);

  const notificationMenuItem = useMemo(() => {
    if (!canSubscribe) {
      return null;
    }

    if (hasPermission) {
      return (
        <IonItem
          lines="full"
          detail={false}
          button
          onClick={subscribeNotification}
          className={'text-sm'}
        >
          Notifications
          <IonIcon icon={notificationsOff} size={'small'} slot={'end'} />
        </IonItem>
      );
    } else {
      return (
        <IonItem
          lines="full"
          detail={false}
          button
          onClick={unsubscribeNotification}
          className={'text-sm border-0'}
        >
          Notifications
          <IonIcon icon={notifications} size={'small'} slot={'end'} />
        </IonItem>
      );
    }
  }, [hasPermission]);

  return (
    <IonHeader translucent className="relative z-40">
      <IonToolbar>
        <IonTitle>{title}</IonTitle>
        {children}
        <IonButtons slot="end">
          <IonButton
            color="dark"
            onClick={(e) => setShowDropDown((val) => true)}
            disabled={showDropdown}
          >
            <IonIcon icon={list} />
          </IonButton>
        </IonButtons>
      </IonToolbar>
      <div
        className={
          'absolute z-50 h-auto top-12 w-44 right-3 transform transition-all ' +
          (showDropdown
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-12 pointer-events-none')
        }
        ref={dropdownRef}
      >
        <div className="absolute h-10 w-11 -top-11 -right-2" />
        <div className="border border-gray-200 shadow-md rounded-xl">
          <IonList className="w-full h-full rounded-xl" lines="none">
            <IonListHeader className="-mt-2 text-sm font-semibold text-primary-400">
              Options
            </IonListHeader>

            {!isLoggedIn && (
              <>
                {notificationMenuItem}
                <IonItem lines="full" detail={false} button>
                  <IonRouterLink
                    className="w-full text-sm"
                    color="dark"
                    routerLink={SIGNUP_ROUTE}
                  >
                    Sign Up
                  </IonRouterLink>
                </IonItem>
                <IonItem lines="full" detail={false} button>
                  <IonRouterLink
                    className="w-full text-sm"
                    color="dark"
                    routerLink={SIGNIN_ROUTE}
                  >
                    Log In
                  </IonRouterLink>
                </IonItem>
              </>
            )}
            {isLoggedIn && shouldCreateProfile && (
              <>
                <IonItem lines="full" detail={false} button 
                    className="w-full text-sm"
                    color="dark"
                    routerLink={SETUP_PROFILE_ROUTE}>
                    Setup Profile
                </IonItem>
                {notificationMenuItem}
                <IonItem lines="full" detail={false} button>
                  <IonText
                    className="w-full text-sm"
                    color="dark"
                    onClick={handleLogout}
                  >
                    Log Out
                  </IonText>
                </IonItem>
              </>
            )}
            {isLoggedIn && !shouldCreateProfile && (
              <>
                <IonItem lines="full" detail={false} button>
                  <IonRouterLink
                    className="w-full text-sm"
                    color="dark"
                    routerLink={PROFILE_ROUTE}
                  >
                    View Profile
                  </IonRouterLink>
                </IonItem>
                {notificationMenuItem}
                <IonItem lines="full" detail={false} button>
                  <IonText
                    className="w-full text-sm"
                    color="dark"
                    onClick={handleLogout}
                  >
                    Log Out
                  </IonText>
                </IonItem>
              </>
            )}
            <IonItem
              lines="none"
              detail={false}
              button
              onClick={() => setShowDropDown(false)}
            >
              <IonText className="text-sm">Close</IonText>
            </IonItem>
          </IonList>
        </div>
      </div>
    </IonHeader>
  );
};

export default NavBar;
