import { Cat } from '@api/cats';
import { NotificationTopic } from '@api/notifyTopics';
import {
  useIonAlert,
  AlertOptions,
  IonIcon,
  useIonModal,
  useIonToast,
} from '@ionic/react';
import { useNotification } from 'hooks/useNotification';
import { locationOutline } from 'ionicons/icons';
import { catsKey, Result } from 'lib/api';
import { KeyedMutator, mutate } from 'swr';
import EditCatModal from './EditCatModal';

interface Props {
  cat: Cat;
  cardColor: string;
  catDataMutate?: KeyedMutator<Result<Cat[]>>;
  editCard?: boolean;
  showLastSeen?: boolean;
}

const AdminCatCard: React.FC<Props> = ({
  cat,
  cardColor,
  editCard,
  catDataMutate,
}) => {
  const [presentAlert] = useIonAlert();
  const [present] = useIonToast();
  const [presentModal, dismissModal] = useIonModal(EditCatModal, {
    dismissModal: () => {
      dismissModal();
      mutate(catsKey);
    },
    cat: cat,
    catDataMutate: catDataMutate,
  });
  const { notify } = useNotification();

  const sendAlert = (name: string) => {
    const title = 'Cat Location Request';
    const body = `Have you seen ${name}?`;
    return notify(NotificationTopic.CatsRequest, title, body).then(
      (response) => {
        if (response.err) {
          present({
            header: 'Request Status',
            message: response.err,
            duration: 3000,
            translucent: true,
            color: 'danger',
            position: 'top',
          });
        } else {
          present({
            header: 'Request Status',
            message: response.message,
            duration: 3000,
            translucent: true,
            color: 'success',
            position: 'top',
          });
        }
      },
    );
  };

  const alertOptions: AlertOptions = {
    header: `Request location for ${cat.name}?`,
    message: 'This will send a notification to all users to keep a lookout!',
    buttons: [
      'Cancel',
      { text: 'Confirm', handler: () => sendAlert(cat.name) },
    ],
  };

  return (
    <div
      className={`flex w-full h-24 shadow-xl ${cardColor} rounded-2xl bg-opacity-90`}
      onClick={() => (editCard ? presentModal() : presentAlert(alertOptions))}
    >
      <div className="flex items-center flex-shrink-0 ml-5">
        <img
          className="object-cover w-16 h-16 border-2 border-white rounded-full"
          src={cat.image}
          alt="cat"
        />
      </div>
      <div className="flex flex-col justify-start flex-auto mt-5 mb-4 ml-4">
        <p className="text-xl font-semibold text-black">{cat.name}</p>
        <div className="flex items-center mt-1">
          <IonIcon className="text-gray-700" icon={locationOutline}></IonIcon>
          <p className="ml-1 text-sm font-semibold text-gray-700">{cat.zone}</p>
        </div>
      </div>
    </div>
  );
};
export default AdminCatCard;
