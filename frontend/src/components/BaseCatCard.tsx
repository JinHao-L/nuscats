import { IonIcon } from '@ionic/react';
import { locationOutline } from 'ionicons/icons';
import { Cat } from '@api/cats';

interface BaseCatCardProps {
  cat: Cat;
  onClick?: (id: number) => void;
}

const BaseCatCard: React.FC<BaseCatCardProps> = ({ cat, onClick }) => {
  return (
    <div
      onClick={() => onClick && onClick(cat.id)}
      className="flex justify-between px-3 mb-4 shadow-xl bg-secondary-100 rounded-2xl bg-opacity-90"
    >
      <div className="flex-shrink-0 mt-5 mb-4">
        <img
          className="object-cover w-24 h-24 rounded-full"
          src={cat.image}
          alt={`cat ${cat.name}`}
        ></img>
      </div>
      <div className="flex flex-col justify-start flex-auto mt-3 mb-4 ml-4">
        <p className="text-lg font-semibold text-gray-700">{cat.name}</p>
        <div className="flex items-center">
          <IonIcon color="secondary" icon={locationOutline}></IonIcon>
          <p className="ml-1 text-sm font-semibold text-secondary-500">
            {cat.zone}
          </p>
        </div>
        <p className="mt-1 text-xs text-gray-900 line-clamp-3">
          {cat.description}
        </p>
      </div>
    </div>
  );
};

export default BaseCatCard;
