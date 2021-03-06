import { Cat, UniversityZone } from "@api/cats";
import { IonButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, useIonPicker, IonPage, IonIcon, useIonAlert, IonPicker } from "@ionic/react";
import { PickerColumn, PickerOptions } from "@ionic/core";
import { useState } from "react";
import { camera, logoOctocat } from "ionicons/icons";
import { Camera, CameraResultType } from "@capacitor/camera";
import { apiFetch, catPicUploadKey, catsKey, Result } from "lib/api";
import { KeyedMutator, mutate } from "swr";

// Note that if cat prop is not given, it is assumed that this is a new cat entry
interface Props {
	dismissModal: () => void,
	cat?: Cat,
	catDataMutate?: KeyedMutator<Result<Cat[]>>,
}

const EditCatModal: React.FC<Props> = ({ dismissModal, cat, catDataMutate }) => {
	// State stores cat data for updates on page
	const [catData, setCatData] = useState(cat ? { ...cat } : {
		name: '',
		zone: UniversityZone.Computing,
		one_liner: '',
		description: '',
		neutered: undefined,
		image: '',
	});

	// Zone picker and neutered status picker setup
	const [presentPicker] = useIonPicker();

	const zonePickerOptionsArr = Object.keys(UniversityZone).map(zone => {
		return ({
			text: zone,
			value: zone,
		});
	}
	);

	const zoneColumn: PickerColumn = {
		name: "zone",
		options: zonePickerOptionsArr,
	}

	// Keep track of errors for form validation
	const [formErrs, setFormErrs] = useState({
		image: false,
		name: false,
		oneLiner: false,
		description: false,
	});

	const [presentAlert] = useIonAlert();

	// Handler for take/upload image button
	const handleChangeProfilePic = async () => {
		try {
			const image = await Camera.getPhoto({
				quality: 90,
				allowEditing: true,
				resultType: CameraResultType.Uri,
			});
			setCatData({
				...catData,
				image: image.webPath as string,
			})
			if (formErrs.image) {
				setFormErrs({
					...formErrs,
					image: false,
				})
			}
		} catch (e) {
			console.error(e);
		}
	}

	// Handler for update cat data button
	const handleUpdateCatData = async () => {
		const imgBlob = await fetch(catData.image).then(res => res.blob());
		try {
			// Get urls for uploading/viewing s3 image
			const response = await apiFetch(`${catPicUploadKey}/${catData.name}`)
			const { signedUrl, imageUrl } = await response.json();
			// Upload to s3
			fetch(signedUrl, {
				headers: {
					'Content-Type': 'image/png',
				},
				method: 'PUT',
				body: imgBlob,
			}).catch((err) => {
				console.error("Image upload failed");
				throw err;
			});
			// Send cat entry to database
			const typedCatData = catData as Cat;
			apiFetch(`${catsKey}/${typedCatData.id}`, { ...typedCatData, image: imageUrl, updated_at: new Date() }, {
				method: 'PUT',
			}).then((res) => {
				if (res.status === 200) {
					presentAlert({
						header: 'Cat successfully updated',
						buttons: [
							{ text: 'Ok', }
						],
						onDidDismiss: dismissModal,
					})
				}
			})
		} catch (err) {
			console.error(err);
		}
	}

	// Handler for add cat button
	const handleAddCatData = async () => {
		// Form validation
		const formErr = {
			image: !catData.image,
			name: !catData.name,
			oneLiner: !catData.one_liner,
			description: !catData.description,
		}
		if (formErr.image || formErr.name || formErr.oneLiner || formErr.description) {
			setFormErrs(formErr);
			return;
		}

		const imgBlob = await fetch(catData.image).then(res => res.blob());
		try {
			// Get urls for uploading/viewing s3 image 
			const response = await apiFetch(`${catPicUploadKey}/${catData.name}`)
			const { signedUrl, imageUrl } = await response.json();
			// Upload to S3
			fetch(signedUrl, {
				headers: {
					'Content-Type': 'image/png',
				},
				method: 'PUT',
				body: imgBlob,
			}).catch((err) => {
				console.error("Image upload failed");
				throw err;
			});
			// Send cat entry to database
			apiFetch(`${catsKey}`, { ...catData, image: imageUrl }, {
				method: 'POST',
			}).then(res => {
				if (res.status === 201) {
					// Show success alert, then close modal
					mutate(catsKey);
					presentAlert({
						header: 'Cat successfully added',
						buttons: [
							{ text: 'Ok', }
						],
						onDidDismiss: dismissModal,
					});
				}
			}).catch((err) => {
				console.error("Uploading cat entry failed");
				throw err;
			})
		} catch (err) {
			console.error(err);
		}

	}

	// Handler for delete cat button
	const handleDeleteCat = () => {
		const typedCatData = catData as Cat;
		apiFetch(`${catsKey}/${typedCatData.id}`, undefined, {
			method: 'DELETE',
		}).then((res) => {
			dismissModal();
		}).catch((err) => {
			console.error(err);
		});
	}

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>{cat ? cat.name : "New cat"}</IonTitle>
					<IonButtons slot="end">
						<IonButton onClick={dismissModal}>Close</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent className="h-full">
				<div className="mx-5">
					<div className="flex flex-col items-center">
						{
							catData.image ?
								<div className="relative mt-1">
									<img className="object-cover mt-5 border-2 rounded-full shadow w-80 h-80 border-primary-400" src={catData.image} alt="cat profile pic" />
									<div
										className="absolute flex items-center justify-center p-1.5 rounded-full shadow-md bg-primary-400 bottom-1.5 right-1.5"
										onClick={handleChangeProfilePic}
									>
										<IonIcon icon={camera} size="large" color="light" />
									</div>
								</div> :
								<div className="relative mt-1">
									<div className="flex items-center justify-center mt-5 bg-gray-300 border-2 rounded-full shadow w-80 h-80 border-primary-400">
										<IonIcon icon={logoOctocat} className="text-center text-gray-100 text-9xl" />
									</div>
									<div
										className="absolute flex items-center justify-center p-1.5 rounded-full shadow-md bg-primary-400 bottom-1.5 right-1.5"
										onClick={handleChangeProfilePic}
									>
										<IonIcon icon={camera} size="large" color="light" />
									</div>
								</div>
						}
						{formErrs.image && <span className="mt-2 ml-1 text-xs font-medium text-red-700">Please provide an image</span>}
					</div>
					<label className="block my-5 text-lg">
						Name:
						<div className={"bg-gray-200 rounded-xl border-2 border-transparent" + (formErrs.name ? " border-red-700" : "")}>
							<input
								id="name"
								className={"block w-full p-3 mt-1 bg-gray-200 border rounded-xl focus:outline-none"}
								value={catData.name}
								onChange={(e) => {
									if (formErrs.name) {
										setFormErrs({
											...formErrs,
											name: false,
										})
									}
									setCatData({ ...catData, name: e.target.value })
								}}
							/>
						</div>
						{formErrs.name && <span className="ml-1 text-xs font-medium text-red-700">Please provide a name</span>}
					</label>
					<label className="block my-5 text-lg">
						Zone:
						<div
							className="block w-full p-3 mt-1 bg-gray-200 border rounded-xl focus:outline-none"
							onClick={() => {
								// Workaround for an IonPicker bug
								zoneColumn.options.forEach(element => {
									delete element.selected;
									delete element.duration;
									delete element.transform;
								});
								presentPicker({
									columns: [
										{
											name: "zone",
											options: zonePickerOptionsArr,
										}
									],
									buttons: [
										{
											text: "Cancel",
											role: "cancel",
										},
										{
											text: "Confirm",
											handler: (selected) => {
												setCatData({ ...catData, zone: selected.zone.value })
											},
										},
									],
								})
							}}
						>
							{catData.zone}
						</div>
					</label>
					<label className="block my-5 text-lg">
						Neutered status:
						<div
							className="block w-full p-3 mt-1 bg-gray-200 border rounded-xl focus:outline-none"
							onClick={() => {
								// Workaround for an IonPicker bug
								zoneColumn.options.forEach(element => {
									delete element.selected;
									delete element.duration;
									delete element.transform;
								})
								presentPicker({
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
												setCatData({ ...catData, neutered: selected.neuteredStatus.value })
											}
										},
									],
								})
							}}
						>
							{catData.neutered ? "Neutered" : catData.neutered == undefined ? "Unknown" : "Not neutered"}
						</div>
					</label>
					<label className="block my-5 text-lg">
						One-liner:
						<div className={"bg-gray-200 rounded-xl border-2 border-transparent" + (formErrs.oneLiner ? " border-red-700" : "")}>
							<textarea
								id="description"
								className="block w-full h-32 px-3 py-1 mt-3 bg-gray-200 border resize-none rounded-xl focus:outline-none"
								value={catData.one_liner}
								onChange={(e) => {
									if (formErrs.oneLiner) {
										setFormErrs({
											...formErrs,
											oneLiner: false,
										});
									}
									setCatData({ ...catData, one_liner: e.target.value })
								}}
							/>
						</div>
						{formErrs.oneLiner && <span className="ml-1 text-xs font-medium text-red-700">Please provide a tldr of this cat</span>}
					</label>
					<label className="block my-5 text-lg">
						Description:
						<div className={"bg-gray-200 rounded-xl border-2 border-transparent" + (formErrs.description ? " border-red-700" : "")}>
							<textarea
								id="description"
								className="block w-full px-3 py-1 mt-3 bg-gray-200 border resize-none h-60 rounded-xl focus:outline-none"
								value={catData.description}
								onChange={(e) => {
									if (formErrs.description) {
										setFormErrs({
											...formErrs,
											description: false,
										})
									}
									setCatData({ ...catData, description: e.target.value })
								}}
							/>
						</div>
						{formErrs.description && <span className="ml-1 text-xs font-medium text-red-700">Please provide a description</span>}
					</label>
					<IonButton
						className="mb-5 text-lg text-white cursor-pointer h-14"
						color="primary"
						expand="block"
						onClick={cat ? handleUpdateCatData : handleAddCatData}
					>
						{cat ? "Update cat data" : "Add cat"}
					</IonButton>
					{cat ?
						<IonButton
							className="mb-5 text-lg text-white cursor-pointer h-14"
							color="danger"
							expand="block"
							onClick={() => presentAlert({
								header: "Delete cat",
								message: `Are you sure you want to delete ${cat.name}?`,
								buttons: [
									"Cancel",
									{ text: "Yes", handler: handleDeleteCat }
								]
							})}
						>
							Delete cat
						</IonButton> : null
					}
				</div>
			</IonContent>
		</IonPage>
	);
}
export default EditCatModal;