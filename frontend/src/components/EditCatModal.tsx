import { Cat, makeCat, UniversityZone } from "@api/cats";
import { IonButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, useIonPicker, IonPage } from "@ionic/react";
import { PickerColumn, PickerOptions } from "@ionic/core";
import { useState } from "react";

// Note that if cat prop is not given, it is assumed that this is a new cat entry
interface Props {
	dismiss: () => void,
	cat?: Cat,
}

const EditCatModal: React.FC<Props> = ({dismiss, cat}) => {
	// State stores cat data for updates on page
	const [catData, setCatData] = useState(cat ? { ...cat } : {
		id: 2,
		name: '',
		zone: UniversityZone.Computing,
		one_liner: '',
		description: '',
		neutered: undefined, 
	});
	
	const [presentZonePicker] = useIonPicker();
	const [presentNeuteredPicker] = useIonPicker();
	const zonePickerOptions: PickerOptions = {
		columns: [{
			name: "zone",
			options: Object.keys(UniversityZone).map(zone => {
				return ({
					text: zone,
					value: zone,
					selected: zone == catData.zone,
				});
			}),
		}],
		buttons: [
			{
				text: "Cancel",
				role: "cancel",
			},
			{
				text: "Confirm",
				handler: (selected) => {
					setCatData({...catData, zone: selected.zone.value})
				},
			},
		],
	}
	const neuteredPickerOptions: PickerOptions = {
		columns: [{
			name: "neuteredStatus",
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
				text: "Confirm",
				handler: (selected) => {
					setCatData({...catData, neutered: selected.neuteredStatus.value})
				}
			},
		],
	}

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>{cat ? cat.name : "New cat"}</IonTitle>
					<IonButtons slot="end">
						<IonButton onClick={dismiss}>Close</IonButton>
					</IonButtons>
				</IonToolbar>	
			</IonHeader>
			<IonContent className="h-full">
				<div className="mx-5">
					<label className="block my-5 text-lg">
						Name:
						<input
							id="name"
							className="block w-full p-3 mt-1 bg-gray-200 border rounded-xl focus:outline-none"
							value={catData.name}
							onChange={(e) => setCatData({...catData, name: e.target.value})}
						/>
					</label>
					<label className="block my-5 text-lg">
						Zone:
						<div
							className="block w-full p-3 mt-1 bg-gray-200 border rounded-xl focus:outline-none"
							onClick={() => presentZonePicker(zonePickerOptions)}
						>
							{catData.zone}
						</div>
					</label>
					<label className="block my-5 text-lg">
						Neutered status:
						<div
							className="block w-full p-3 mt-1 bg-gray-200 border rounded-xl focus:outline-none"
							onClick={() => presentNeuteredPicker(neuteredPickerOptions)}
						>
							{catData.neutered ? "Neutered" : catData.neutered == undefined ? "Unknown" : "Not neutered"}
						</div>
					</label>
					<label className="block my-5 text-lg">
						One-liner:
						<textarea
							id="description"
							className="block w-full h-32 px-3 py-1 mt-3 bg-gray-200 border resize-none rounded-xl focus:outline-none"
							value={catData.one_liner}
							onChange={(e) => {
								setCatData({...catData, one_liner: e.target.value})
							}}
						/>
					</label>
					<label className="block my-5 text-lg">
						Description:
						<textarea
							id="description"
							className="block w-full px-3 py-1 mt-3 bg-gray-200 border resize-none h-60 rounded-xl focus:outline-none"
							value={catData.description}
							onChange={(e) => {
								setCatData({...catData, description: e.target.value})
							}}
						/>
					</label>
					<IonButton
						className="mb-5 text-lg text-white cursor-pointer h-14"
						color="primary"
						expand="block"
						onClick={() => console.log(cat ? {...catData, updated_at: new Date()} : makeCat(catData))}
					>
						Update cat data
					</IonButton>
				</div>
			</IonContent>
		</IonPage>
	);
}
export default EditCatModal;