import { IonContent, IonHeader, IonInput, IonItem, IonPage, IonTitle, IonToolbar } from "@ionic/react";

const Signup: React.FC = () => {
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Signup</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<form className="flex flex-col h-1/2 justify-around">
					<input className="border rounded py-2 px-3" />
					<input className="border rounded py-2 px-3" />
				</form>
			</IonContent>
		</IonPage>
	);
}

export default Signup;