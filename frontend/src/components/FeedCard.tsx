import { CatSighting } from '@api/sightings';
import { IonItem, IonLabel } from '@ionic/react';
import React from 'react';

interface FeedCardProps {
  sighting: CatSighting;
}

// id: number;
// image: string; // url to image
// catId?: number; // id reference to cat
// cat?: Cat; // when viewing a particular sighting information
// location: Point;
// type: SightingType;
// description: string;
// ownerId?: string;
// created_at: Date;
// updated_at: Date;

const FeedCard: React.FC<FeedCardProps> = ({ sighting }) => {
  return (
    <IonItem>
      <IonLabel>{sighting.description}</IonLabel>
    </IonItem>
  );
};

export default FeedCard;
