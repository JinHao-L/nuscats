import { Cat } from "@api/cats";
import { useIonAlert, AlertOptions, IonIcon, useIonModal } from "@ionic/react";
import { locationOutline } from "ionicons/icons";
import { PlaceholderCatUrl } from "lib/utils";
import EditCatModal from "./EditCatModal";

interface Props {
	cat: Cat,
	cardColor: string,
	editCard?: boolean,
}

const AdminCatCard: React.FC<Props> = ({cat, cardColor, editCard}) => {
	
	const [presentAlert] = useIonAlert();
	const [presentModal, dismissModal] = useIonModal(EditCatModal);

	const alertOptions: AlertOptions = {
		header: `Request location for ${cat.name}?`,
		message: "This will send a notification to all users to keep a lookout!",
		buttons: [
			"Cancel",
			{text: "Confirm", handler: () => console.log("Confirm pressed for " + cat.name)}
		],
	}

	return (
		<div 
			className={`flex w-full h-24 mb-5 shadow-xl ${cardColor} rounded-2xl bg-opacity-90`}
			onClick={() => editCard ? presentModal() : presentAlert(alertOptions)}
		>
			<div className="flex items-center flex-shrink-0 ml-5">
				<img className="w-16 h-16 border-2 border-white rounded-full" src={PlaceholderCatUrl(200, 210)} alt="cat" />
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
}
export default AdminCatCard;