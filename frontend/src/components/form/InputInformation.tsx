import React, { useState } from 'react';
import { Cat } from '@api/cats';
import { CreateSightingRequest, SightingType } from '@api/sightings';
import {
  IonButton,
  IonContent,
  IonLoading,
  IonModal,
  IonText,
} from '@ionic/react';
import BaseCatCard from 'components/BaseCatCard';
import { Coords } from 'hooks/useGeolocation';
import { uploadSighting } from 'lib/sightings';
import { getSightingImageUpload, uploadImage } from 'lib/uploads';
import { UserPhoto } from 'utils/takePhoto';
import SelectCatModal from './SelectCatModal';
import useAuth from 'hooks/useAuth';

type InputInformationProps = {
  cats: Cat[];
  photo: UserPhoto;
  sightingType: SightingType;
  dismiss: () => void;
  onSightingCreate: () => void;
  coords: Coords;
};

const InputInformation = ({
  photo,
  cats,
  sightingType,
  coords,
  dismiss,
  onSightingCreate,
}: InputInformationProps) => {
  const [catId, setCatId] = useState<number | undefined>(undefined);
  const [showSelectCat, setShowSelectCat] = useState(false);
  const [description, setDescription] = useState('');

  const [error, setError] = useState('');

  const [uploading, setUploading] = useState(false);
  
  const { userId } = useAuth();

  const onSubmit = async () => {
    try {
      setUploading(true);
      const uploadResponse = await getSightingImageUpload();
      await uploadImage(uploadResponse.signedUrl, photo);
      const request: CreateSightingRequest = {
        image: uploadResponse.imageUrl,
        catId,
        latlng: `${coords.latitude},${coords.longitude}`,
        type: sightingType,
        description,
        ownerId: userId as string,
      };
      if (!request.catId) delete request.catId;
      await uploadSighting(request);
      onSightingCreate();
      setUploading(false);
      dismiss();
    } catch (e) {
      console.log(e);
      setError((e as Error).message);
      setUploading(false);
    }
  };
  return (
    <IonContent>
      <div className="m-5">
        <div className="flex">
          <img
            className="m-auto rounded-lg"
            src={photo.dataUrl}
            alt="sighting taken"
          />
        </div>

        <label className="block my-5 text-lg">
          Cat:
          <CatDisplay
            cat={cats.find((cat) => cat.id === catId)}
            onClick={() => {
              setShowSelectCat(true);
            }}
            resetCat={() => setCatId(undefined)}
          />
        </label>

        <label className="block my-5 text-lg">
          Description:
          <textarea
            id="description"
            className="block w-full h-32 px-3 py-1 mt-3 bg-gray-200 border resize-none rounded-xl focus:outline-none"
            value={description}
            onChange={({ target }) => setDescription(target.value)}
          />
        </label>
        <IonText color="danger">{error}</IonText>
        <IonButton onClick={onSubmit} shape="round" expand="full">
          Upload
        </IonButton>
      </div>
      <IonModal isOpen={showSelectCat}>
        <SelectCatModal
          cats={cats}
          onDismiss={() => setShowSelectCat(false)}
          onSelect={(id: number) => {
            setShowSelectCat(false);
            setCatId(id);
          }}
        />
      </IonModal>
      <IonLoading
        isOpen={uploading}
        backdropDismiss
        message="Creating sighting..."
        spinner="circular"
      />
    </IonContent>
  );
};

export default InputInformation;

type CatDisplayProps = {
  cat: Cat | undefined;
  onClick: () => void;
  resetCat: () => void;
};
const CatDisplay = ({ cat, onClick, resetCat }: CatDisplayProps) => {
  if (cat) {
    return (
      <div>
        <BaseCatCard cat={cat} onClick={onClick} />
        <IonButton shape="round" expand="full" onClick={resetCat}>
          Remove Cat
        </IonButton>
      </div>
    );
  } else {
    return (
      <div>
        <IonButton shape="round" expand="full" onClick={onClick}>
          Select Cat
        </IonButton>
      </div>
    );
  }
};
