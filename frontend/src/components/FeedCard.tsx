import { CatSighting, SightingType } from '@api/sightings';
import {
  IonAvatar,
  IonCard,
  IonCardContent,
  IonCardSubtitle,
  IonCardTitle,
  IonChip,
  IonIcon,
  IonImg,
  IonItem,
  IonItemGroup,
  IonLabel,
  IonRow,
  IonText,
} from '@ionic/react';
import { locationOutline, logoOctocat, timeOutline } from 'ionicons/icons';
import { ConvenientDateTimeFormatOptions } from 'lib/datetime';
import React, { useMemo } from 'react';

interface FeedCardProps {
  sighting: CatSighting;
}

// catId?: number; // id reference to cat
// cat?: Cat; // when viewing a particular sighting information
// location: Point;
// created_at: Date;
// updated_at: Date;

const FeedCard: React.FC<FeedCardProps> = ({ sighting }) => {
  const baseColor = useMemo(
    () => (sighting.type === SightingType.Emergency ? undefined : undefined),
    [sighting?.type],
  );

  return (
    <IonCard color={baseColor}>
      <IonItem className="pt-1 overflow-visible" color={baseColor} lines="none">
        <IonAvatar slot="start">
          <IonImg
            src="https://i.pravatar.cc/300"
            className="inline-block align-middle w-11 h-11 rounded-xl"
          />
        </IonAvatar>
        <IonLabel className="inline-block align-middle ">
          <IonCardTitle className="text-base font-bold">
            Robert Phan
          </IonCardTitle>
          <IonCardSubtitle className="mb-0 text-sm font-medium text-gray-500 normal-case">
            Optional Title
          </IonCardSubtitle>
        </IonLabel>
        <IonItemGroup className="relative top-3">
          <div className="flex flex-row items-center justify-center space-x-2">
            <IonIcon color="secondary" icon={logoOctocat} />
            <IonText className="text-sm font-medium text-gray-800">
              {sighting.cat?.name}
            </IonText>
          </div>
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
        <IonText className="ion-text-wrap">{sighting.description}</IonText>
        <IonImg
          src={sighting.image}
          className="object-cover w-full h-full mt-2"
        />
        <IonRow className="flex justify-between mx-2 my-2">
          <div className="flex items-center space-x-2">
            <IonIcon color="secondary" icon={locationOutline} />
            <IonLabel className="text-sm text-gray-800">
              {sighting.location.coordinates}
            </IonLabel>
          </div>
          <div className="flex items-center space-x-2">
            <IonIcon color="primary" icon={timeOutline} />
            <IonLabel className="text-sm text-gray-800">
              {new Intl.DateTimeFormat(
                'en-GB',
                ConvenientDateTimeFormatOptions,
              ).format(sighting.created_at)}
            </IonLabel>
          </div>
        </IonRow>
        <IonText className="flex flex-row-reverse items-center justify-center gap-1"></IonText>
      </IonCardContent>
    </IonCard>
  );
};

export default FeedCard;
