import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonPage, IonSpinner, IonTitle, IonToolbar, useIonModal } from "@ionic/react";
import { Cat } from '@api/cats';
import AdminCatCard from "components/AdminCatCard";
import EditCatModal from "components/EditCatModal";
import { useCats } from "hooks/useCats";

const EditCatsList: React.FC = () => {
	const { cats, isLoading, mutate } = useCats();
	let pageContent;
	if (isLoading) {
		pageContent = (
			<IonContent>
				<div className="flex flex-col items-center h-full mx-5 my-5">
					<IonSpinner />
				</div>
			</IonContent>
		);
	} else {
		const catsData = cats as Cat[];
		pageContent = (
			<IonContent>
				<div className="flex flex-col mx-5 my-5">
					{catsData.map(cat =>
						<AdminCatCard key={cat.id} cat={cat} cardColor="bg-tertiary-200" catDataMutate={mutate} editCard />
					)}
				</div>
				<IonButton
					className="mx-5 text-lg text-white cursor-pointer h-14"
					color="primary"
					expand="block"
					onClick={() => presentModal()}
				>
					Add cat
				</IonButton>
			</IonContent>
		);
	}

	// Add new cat modal
	const [presentModal, dismissModal] = useIonModal(EditCatModal, {
		dismissModal: () => dismissModal(),
	});

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonButtons slot="start">
						<IonBackButton defaultHref="/" />
					</IonButtons>
					<IonTitle>
						Edit/Add cats
					</IonTitle>
				</IonToolbar>
			</IonHeader>
			{pageContent}
		</IonPage>
	);
}
export default EditCatsList;