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
  IonModal,
  IonRouterLink,
  IonRow,
  IonText,
  useIonRouter,
} from '@ionic/react';
import {
  checkmark,
  chevronForward,
  locationOutline,
  logoOctocat,
  timeOutline,
  trash,
} from 'ionicons/icons';
import TimeAgo from 'timeago-react';
import React, { useState } from 'react';
import { Profile, Cat, CatSighting, SightingType } from '@api';
import defaultAvatar from 'assets/default_avatar.png';
import { CAT_ROUTE } from 'app/routes';
import usePinLocation from 'hooks/usePinLocation';
import useAuth from 'hooks/useAuth';
import SelectCatModal from 'components/form/SelectCatModal';
import { deleteSighting, updateSighting } from 'lib/sightings';
import {
  useAlertSightings,
  useLatestSightings,
  useSightings,
} from 'hooks/useSightings';
import { isAdmin } from 'lib/auth';

interface FeedCardProps {
  sighting: CatSighting;
  owner: Profile | undefined;
  cat: Cat | undefined;
  // For callers to pass in any additional work they want to do
  onDelete?: (sighting: CatSighting) => void;
  onCatUpdate?: (sighting: CatSighting) => void;
}

const FeedCard: React.FC<FeedCardProps> = ({
  sighting,
  owner,
  onDelete,
  onCatUpdate, // Callback for mutations
  cat,
}) => {
  const [lat, lng] = sighting.location.coordinates;

  const { ionRouterLinkProps: locationRouterProps } = usePinLocation(
    lat,
    lng,
    cat?.name,
  );

  const latest = useLatestSightings();
  const sightings = useSightings();
  const alerts = useAlertSightings();

  const [showSelectCat, setShowSelectCat] = useState(false);
  const { userProfile } = useAuth();
  const router = useIonRouter();

  const routeToCat = () => {
    if (cat) {
      router.push(`${CAT_ROUTE}/${cat.id}`, 'root');
    }
  };

  const mutate = () => {
    latest.mutate();
    sightings.mutate();
    alerts.mutate();
  };

  const canDeleteSighting = (): boolean => {
    return (
      sighting.type === SightingType.CatSighted &&
      (userProfile?.user?.uuid === sighting.owner_id ||
        isAdmin(userProfile?.user))
    );
  };

  const canResolveEmergency = (): boolean => {
    return (
      sighting.type === SightingType.Emergency && isAdmin(userProfile?.user)
    );
  };

  const canUpdateCat = (): boolean => {
    return isAdmin(userProfile?.user);
  };

  const onDeleteSighting = async () => {
    const deletedSighting = await deleteSighting(sighting.id);
    mutate();
    if (onDelete) {
      onDelete(deletedSighting);
    }
  };

  const onSelectCat = async (cat: Cat) => {
    const updatedSighting = await updateSighting(sighting.id, {
      catId: cat.id,
    });

    setShowSelectCat(false);
    mutate();
    if (onCatUpdate) {
      onCatUpdate(updatedSighting);
    }
  };

  return (
    <>
      <IonCard className="max-w-3xl mb-5 bg-secondary-50 bg-opacity-90 rounded-xl">
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
            <div className="flex flex-col items-center justify-end space-x-2">
              <IonChip
                onClick={routeToCat}
                className="text-xs font-medium"
                color="primary"
              >
                <IonIcon color="primary" icon={logoOctocat} />
                <IonLabel> {cat?.name || 'Unknown'}</IonLabel>
                {cat && <IonIcon color="primary" icon={chevronForward} />}
              </IonChip>
              {canUpdateCat() && (
                <IonButton
                  onClick={() => setShowSelectCat(true)}
                  fill="outline"
                >
                  Set cat <IonIcon slot="end" icon={chevronForward} />
                </IonButton>
              )}
            </div>
          </IonItemGroup>
        </IonItem>
        <IonCardContent>
          <IonImg
            src={sighting.image}
            className="object-cover w-full h-full mt-2"
          />
          <IonRow className="ion-padding-vertical">
            {sighting.type !== SightingType.Emergency ? (
              <IonChip className="text-xs font-medium " color="secondary">
                <IonLabel>Spotted</IonLabel>
              </IonChip>
            ) : (
              <IonChip className="text-xs font-medium" color="danger">
                Emergency!
              </IonChip>
            )}
          </IonRow>
          <IonRow className="flex justify-between mt-4 ion-align-items-center">
            <IonText className="ml-2 text-gray-900 ion-text-wrap">
              {sighting.description}
            </IonText>
          </IonRow>
          <IonRow className="flex justify-between mt-4 ion-align-items-center">
            <IonCol>
              <div className="items-center space-x-2">
                <IonRouterLink {...locationRouterProps}>
                  <IonIcon color="secondary" icon={locationOutline} />
                </IonRouterLink>
                <IonLabel className="text-sm text-gray-800">
                  <TimeAgo datetime={sighting.created_at} />
                </IonLabel>
              </div>
              <div className="flex items-center space-x-2">
                <IonIcon color="secondary" icon={timeOutline} />
                <IonLabel className="text-sm text-gray-800">
                  <TimeAgo datetime={sighting.created_at} />
                </IonLabel>
              </div>
            </IonCol>
            {canDeleteSighting() && <DeleteButton onClick={onDeleteSighting} />}
            {canResolveEmergency() && (
              <ResolveButton onClick={onDeleteSighting} />
            )}
          </IonRow>
          <IonText className="flex flex-row-reverse items-center justify-center gap-1"></IonText>
        </IonCardContent>
      </IonCard>
      <IonModal isOpen={showSelectCat}>
        <SelectCatModal
          onDismiss={() => setShowSelectCat(false)}
          onSelect={onSelectCat}
        />
      </IonModal>
    </>
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
