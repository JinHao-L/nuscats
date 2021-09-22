import {
  IonAvatar,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardTitle,
  IonChip,
  IonCol,
  IonIcon,
  IonImg,
  IonItem,
  IonItemGroup,
  IonLabel,
  IonRouterLink,
  IonRow,
  IonText,
} from '@ionic/react';
import {
  checkmark,
  locationOutline,
  logoOctocat,
  timeOutline,
  trash,
} from 'ionicons/icons';
import TimeAgo from 'timeago-react';
import React, { useMemo } from 'react';
import { Profile, Cat, CatSighting, SightingType, RoleType } from '@api';
import defaultAvatar from 'assets/default_avatar.png';
import { CAT_ROUTE } from 'app/routes';
import usePinLocation from 'hooks/usePinLocation';
import { deleteSighting, updateSighting } from 'lib/sightings';
import useAuth from 'hooks/useAuth';
import { useSWRConfig } from 'swr';
import { latestKey, sightingsKey } from 'lib/api';

interface FeedCardProps {
  sighting: CatSighting;
  owner: Profile | undefined;
  cat: Cat | undefined;
}

const FeedCard: React.FC<FeedCardProps> = ({ sighting, cat, owner }) => {
  const [lat, lng] = sighting.location.coordinates;
  const { ionRouterLinkProps: locationRouterProps } = usePinLocation(
    lat,
    lng,
    cat?.name,
  );
  const { mutate } = useSWRConfig();
  const { userProfile } = useAuth();

  const catRouterProps: {
    routerLink?: string;
    routerDirection?: 'none' | 'forward' | 'back' | 'root';
  } = useMemo(() => {
    if (!cat) return {};

    return {
      routerLink: `${CAT_ROUTE}/${cat.id}`,
      routerDirection: 'root',
    };
  }, [cat]);

  const canDeleteSighting = () => {
    return (
      userProfile?.user?.uuid === sighting.owner_id ||
      userProfile?.user?.roles.includes(RoleType.Admin)
    );
  };

  const canResolveEmergency = () => {
    return userProfile?.user?.roles.includes(RoleType.Admin);
  };

  const onDelete = async () => {
    await deleteSighting(sighting.id);
    mutate(sightingsKey);
    mutate(latestKey);
  };

  return (
    <IonCard className="mb-5 bg-secondary-50 bg-opacity-90">
      <IonItem
        className="pt-1 overflow-visible bg-secondary-50 bg-opacity-90"
        color={'gray'}
        lines="none"
      >
        <IonAvatar slot="start">
          <IonImg
            src={owner?.profile_pic || defaultAvatar}
            className="inline-block align-middle w-11 h-11 rounded-xl"
          />
        </IonAvatar>
        <IonLabel className="inline-block align-middle ">
          <IonCardTitle className="text-base font-bold">
            {owner?.username || 'Anonymous'}
          </IonCardTitle>
          {/* <IonCardSubtitle className="mb-0 text-sm font-medium text-gray-500 normal-case">
            Optional Title
          </IonCardSubtitle> */}
        </IonLabel>
        <IonItemGroup className="relative top-3">
          <IonRouterLink {...catRouterProps}>
            <div className="flex flex-row items-center justify-center space-x-2">
              <IonIcon color="secondary" icon={logoOctocat} />
              <IonText className="text-sm font-medium text-gray-800">
                {cat?.name || 'Unknown'}
              </IonText>
            </div>
          </IonRouterLink>
          {sighting.type !== SightingType.Emergency ? (
            <IonChip className="text-xs font-medium " color="secondary">
              <IonLabel>Spotted</IonLabel>
            </IonChip>
          ) : (
            <IonChip className="text-xs font-medium" color="danger">
              Emergency!
            </IonChip>
          )}
        </IonItemGroup>
      </IonItem>
      <IonCardContent>
        <IonText className="text-gray-900 ion-text-wrap">
          {sighting.description}
        </IonText>
        <IonImg
          src={sighting.image}
          className="object-cover w-full h-full mt-2"
        />
        <IonRow className="flex justify-between mt-4 ion-align-items-center">
          <IonCol>
            <IonRouterLink {...locationRouterProps}>
              <div className="flex items-center space-x-2">
                <IonIcon color="secondary" icon={locationOutline} />
                <IonLabel className="text-sm text-gray-800">
                  {sighting.location_name}
                </IonLabel>
              </div>
            </IonRouterLink>
            <div className="flex items-center space-x-2">
              <IonIcon color="secondary" icon={timeOutline} />
              <IonLabel className="text-sm text-gray-800">
                <TimeAgo datetime={sighting.created_at} />
              </IonLabel>
            </div>
          </IonCol>
          {sighting.type === SightingType.CatSighted && canDeleteSighting() && (
            <DeleteButton onClick={onDelete} />
          )}
          {sighting.type === SightingType.Emergency &&
            canResolveEmergency() && <ResolveButton onClick={onDelete} />}
        </IonRow>
        <IonText className="flex flex-row-reverse items-center justify-center gap-1"></IonText>
      </IonCardContent>
    </IonCard>
  );
};

export default FeedCard;

type DeleteButtonProps = {
  onClick: () => void;
};

const DeleteButton = ({ onClick }: DeleteButtonProps) => {
  return (
    <IonButton onClick={onClick} color="danger" fill="outline" size="small">
      <IonIcon slot="end" icon={trash} />
      Delete
    </IonButton>
  );
};

type ResolveButtonProps = {
  onClick: () => void;
};

const ResolveButton = ({ onClick }: ResolveButtonProps) => {
  return (
    <IonButton onClick={onClick} color="success" fill="outline" size="small">
      <IonIcon slot="end" icon={checkmark} />
      Resolve
    </IonButton>
  );
};
