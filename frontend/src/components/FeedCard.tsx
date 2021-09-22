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
import useAuth from 'hooks/useAuth';

interface FeedCardProps {
  sighting: CatSighting;
  owner: Profile | undefined;
  cat: Cat | undefined;
  onDelete?: () => void;
}

const FeedCard: React.FC<FeedCardProps> = ({
  sighting,
  cat,
  owner,
  onDelete,
}) => {
  const [lat, lng] = sighting.location.coordinates;
  const { ionRouterLinkProps: locationRouterProps } = usePinLocation(
    lat,
    lng,
    cat?.name,
  );
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
      onDelete &&
      sighting.type === SightingType.CatSighted &&
      (userProfile?.user?.uuid === sighting.owner_id ||
        userProfile?.user?.roles.includes(RoleType.Admin))
    );
  };

  const canResolveEmergency = () => {
    return (
      onDelete &&
      sighting.type === SightingType.Emergency &&
      userProfile?.user?.roles.includes(RoleType.Admin)
    );
  };

  return (
    <IonCard className="max-w-3xl mb-5 bg-secondary-50 bg-opacity-95 rounded-xl">
      <IonItem
        className="pt-1 overflow-visible bg-secondary-50 bg-opacity-95"
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
          <IonCardTitle className="text-lg font-semibold">
            {owner?.username || 'Anonymous'}
          </IonCardTitle>
          {/* <IonCardSubtitle className="mb-0 text-sm font-medium text-gray-500 normal-case">
            Optional Title
          </IonCardSubtitle> */}
        </IonLabel>
        <IonItemGroup className="relative top-3">
          <IonRouterLink {...catRouterProps}>
            <div className="flex items-center justify-center pb-1 space-x-2">
              <IonIcon color="secondary" icon={logoOctocat} />
              <IonText className="text-lg font-semibold text-gray-700">
                {cat?.name || 'Unknown'}
              </IonText>
            </div>
          </IonRouterLink>
          {sighting.type !== SightingType.Emergency ? (
            <IonChip className="text-xs font-semibold" color="secondary">
              <IonLabel>Spotted</IonLabel>
            </IonChip>
          ) : (
            <IonChip className="text-xs font-semibold" color="danger">
              Emergency!
            </IonChip>
          )}
        </IonItemGroup>
      </IonItem>
      <IonCardContent className="flex flex-col items-center">
        <div>
          <IonText className="ml-1 text-gray-900 ion-text-wrap">
            {sighting.description}
          </IonText>
          <IonImg
            src={sighting.image}
            className="object-cover w-full h-full max-w-xl mt-2"
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
            {canDeleteSighting() && <DeleteButton onClick={onDelete!} />}
            {canResolveEmergency() && <ResolveButton onClick={onDelete!} />}
          </IonRow>
          <IonText className="flex flex-row-reverse items-center justify-center gap-1"></IonText>
        </div>
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
