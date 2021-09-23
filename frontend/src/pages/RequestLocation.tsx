import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, AlertOptions, useIonAlert, IonSpinner } from "@ionic/react";
import { Cat } from '@api/cats';
import AdminCatCard from "components/AdminCatCard";
import { useCats } from "hooks/useCats";

const RequestLocation: React.FC = () => {

	const { cats, error, isLoading, mutate } = useCats();
	let pageContent;
	if (isLoading) {
		pageContent = (
			<div className="flex flex-col items-center h-full mx-5 my-5">
				<IonSpinner />
			</div>
		);
	} else {
		pageContent = (
			<div className="flex flex-col h-full mx-5 my-5">
				{(cats as Cat[]).map(cat =>
					<AdminCatCard key={cat.id} cat={cat} cardColor="bg-secondary-200" />
				)}
			</div>
		);
	}

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonButtons slot="start">
						<IonBackButton defaultHref="/" />
					</IonButtons>
					<IonTitle>
						Request cat location
					</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				{pageContent}
			</IonContent>
		</IonPage>
	);
};
export default RequestLocation;