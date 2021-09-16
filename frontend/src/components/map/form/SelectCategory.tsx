import { IonIcon, IonText } from '@ionic/react';
import { alertCircleOutline, eye } from 'ionicons/icons';

type SelectCategoryProps = {
  selectSighting: () => void;
  selectEmergency: () => void;
};

const SelectCategory = ({
  selectSighting,
  selectEmergency,
}: SelectCategoryProps) => {
  return (
    <div className="flex flex-col justify-around flex-grow ">
      <Card
        onClick={selectSighting}
        icon={eye}
        color="success"
        text="Sighting!"
      />
      <Card
        onClick={selectEmergency}
        icon={alertCircleOutline}
        color="danger"
        text="Emergency!"
      />
    </div>
  );
};

export default SelectCategory;

type CardProps = {
  color: string;
  text: string;
  icon: string;
  onClick: () => void;
};
const Card = ({ color, text, icon, onClick }: CardProps) => {
  return (
    <div
      onClick={onClick}
      className="flex flex-col justify-center flex-grow p-5 m-5 bg-white rounded-md shadow-lg cursor-pointer hover:bg-gray-100"
    >
      <div className="text-center text-9xl">
        <IonIcon slot="end" color={color} icon={icon} />
      </div>
      <IonText color={color} className="text-center">
        <p className="text-4xl">{text}</p>
      </IonText>
    </div>
  );
};
