import { IonBackButton, IonButtons, IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";


const BroadcastAnnouncement: React.FC = () => {
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonButtons slot="start">
						<IonBackButton defaultHref="/" />
					</IonButtons>
					<IonTitle>
						Broadcast announcement
					</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<div className="block mx-5">
					<label className="block my-5 text-lg">
						Broadcast message:
						<textarea
							id="email"
							className="block w-full px-3 py-1 mt-3 bg-gray-200 border h-60 rounded-xl focus:outline-none"
						/>
					</label>
				</div>
				<IonButton
					className="mx-5 text-lg text-white cursor-pointer h-14"
					color="primary"
					expand="block"
					routerDirection="forward"
				>
					Update announcement
				</IonButton>
			</IonContent>
		</IonPage>
	);
};
export default BroadcastAnnouncement;