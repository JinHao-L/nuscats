import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonRouterLink,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { settingsOutline } from 'ionicons/icons';
import { MAP_ROUTE, PROFILE_SETTINGS_ROUTE, SIGNIN_ROUTE } from 'app/routes';
import useAuth from 'hooks/useAuth';
import { useMemo } from 'react';
import { useSightings, UseSightingsOptions } from 'hooks/useSightings';
import { InfiniteImageGallery } from 'components/InfiniteImageGallery';

const ProfileTab: React.FC = () => {
  // Fetch profile data
  const { isLoggedIn, userProfile } = useAuth();
  // Fetch sightings data
  var queryOptions: UseSightingsOptions = { limit: 18, page: 1 };
  if (userProfile) {
    queryOptions.ownerIds = [userProfile.uuid];
  }
  const { sightings, isLoading, pageSize, setPageSize } =
    useSightings(queryOptions);

  const username = useMemo(() => userProfile?.username, [userProfile]);
  const fullname = useMemo(() => (userProfile?.first_name as string + ' ' + userProfile?.last_name), [userProfile]);

  // Page to display if user is not signed in
  if (!isLoggedIn) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Profile</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <div className="flex flex-col justify-center h-full">
            <p className="text-xl font-semibold text-center text-secondary-500">
              <IonRouterLink href={SIGNIN_ROUTE} routerOptions={{}}>Sign in</IonRouterLink>{' '}
              to view profile
            </p>
          </div>
        </IonContent>
      </IonPage>
    );
  }

  if (!userProfile) {
    return (
      <IonPage>
        <IonHeader>
          <IonTitle>Profile</IonTitle>
        </IonHeader>
        <IonContent>
          <div className="flex flex-col justify-center h-full">
            <p className="text-xl font-semibold text-center text-secondary-500">
              Profile data not available
            </p>
          </div>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref={MAP_ROUTE} />
          </IonButtons>
          <IonButtons slot="end">
            <IonButton
              fill="clear"
              color="secondary"
              slot="icon-only"
              routerLink={PROFILE_SETTINGS_ROUTE}
              size={'large'}
              className="pb-2 pr-2"
            >
              <IonIcon icon={settingsOutline} />
            </IonButton>
          </IonButtons>
          <IonTitle slot="start" className="leading-snug">
            Profile
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="flex flex-col h-full mx-5 my-5">
          <div className="p-5 mt-2 border shadow-xl bg-secondary-200 rounded-3xl">
            <div className="flex">
              <img
                src={userProfile.profile_pic}
                alt="profile pic"
                className="object-cover w-20 h-20 border-2 border-white rounded-3xl"
              />
              <div className="w-full ml-3">
                <p className="text-xl font-bold">{username}</p>
                <p>{fullname}</p>
              </div>
            </div>
          </div>
          <InfiniteImageGallery
            details={sightings?.map(
              (sighting, idx) => ({
                altText: `cat pic ${idx}`,
                src: sighting.image,
              }),
            )}
            withoutBorder={true}
            isLoading={isLoading}
            loadingText="Loading more kitty sightings"
            renderEmpty={() => (
              <div className="flex items-center justify-center w-full h-full mt-40">
                <p className="font-semibold text-primary-400">No cat sightings yet</p>
              </div>
            )}
            galleryClassName="mt-5"
            infiniteScrollThreshold="100px"
            pageSize={pageSize}
            setPageSize={setPageSize}
          />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ProfileTab;
