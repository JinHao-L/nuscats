import { UniversityZone } from "@api/cats";
import { IonButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, useIonPicker } from "@ionic/react";
import { PickerColumn, PickerOptions } from "@ionic/core";

const EditCatModal: React.FC = () => {
	
	const [presentPicker] = useIonPicker();
	const zonePickerOptions: PickerOptions = {
		columns: [{
			name: "Zone",
			options: Object.keys(UniversityZone).map(zone => {
				return ({
					text: zone,
					value: zone
				});
			}),
		}],
		buttons: [
			{
				text: "Cancel",
				role: "cancel",
			},
			{
				text: "Confirm"
			},
		],
	}
	const neuteredPickerOptions: PickerOptions = {
		columns: [{
			name: "Neutered status",
			options: [{
				text: "Unknown",
				value: undefined,
			},
			{
				text: "Neutered",
				value: true,
			},
			{
				text: "Not neutered",
				value: false,
			}]
		}],
		buttons: [
			{
				text: "Cancel",
				role: "cancel",
			},
			{
				text: "Confirm"
			},
		],
	}

	return (
		<div>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Cat name here</IonTitle>
					<IonButtons slot="end">
						<IonButton>Close</IonButton>
					</IonButtons>
				</IonToolbar>	
			</IonHeader>
			<div className="mx-5">
				<label className="block my-5 text-lg">
					Name:
					<input
						id="name"
						className="block w-full p-3 mt-1 bg-gray-200 border rounded-xl focus:outline-none"
						value="LSKJDLKJ"
					/>
				</label>
				<label className="block my-5 text-lg">
					Zone:
					<div
						className="block w-full p-3 mt-1 bg-gray-200 border rounded-xl focus:outline-none"
						onClick={() => presentPicker(zonePickerOptions)}
					>
						Display zone
					</div>
				</label>
				<label className="block my-5 text-lg">
					Neutered status:
					<div
						className="block w-full p-3 mt-1 bg-gray-200 border rounded-xl focus:outline-none"
						onClick={() => presentPicker(neuteredPickerOptions)}
					>
						Display zone
					</div>
				</label>
				<label className="block my-5 text-lg">
					Description:
					<textarea
						id="description"
						className="block w-full px-3 py-1 mt-3 bg-gray-200 border h-60 rounded-xl focus:outline-none"
					/>
				</label>
				<IonButton
					className="text-lg text-white cursor-pointer h-14"
					color="primary"
					expand="block"
				>
					Update cat data
				</IonButton>
			</div>
		</div>
	);
}
export default EditCatModal;