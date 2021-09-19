import { IonContent, IonHeader, IonIcon, IonPage, IonRouterLink, IonTitle, IonToolbar } from "@ionic/react";
import { compass, create, megaphone } from "ionicons/icons";

const Admin: React.FC = () => {
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>
						Admin actions
					</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<div className="flex flex-col mx-5 mt-5">
					<IonRouterLink routerLink="/admin/announcement">
						<button className="flex items-center w-full h-40 px-4 mb-5 shadow-xl active:bg-primary-400 bg-primary-300 rounded-2xl bg-opacity-90">
							<IonIcon icon={megaphone} className="w-32 mr-2 text-black text-7xl" />
							<p className="w-full text-xl font-semibold text-left text-black">Broadcast announcement</p>
						</button>
					</IonRouterLink>
					<IonRouterLink routerLink="/admin/reqlocation">
						<button className="flex items-center w-full h-40 px-4 mb-5 shadow-xl active:bg-secondary-500 bg-secondary-400 rounded-2xl bg-opacity-90">
							<IonIcon icon={compass} className="w-32 mr-2 text-black text-7xl" />
							<p className="w-full text-xl font-semibold text-left text-black">Request cat location</p>
						</button>
					</IonRouterLink>
					<button className="flex items-center w-full h-40 px-4 mb-5 shadow-xl active:bg-tertiary-400 bg-tertiary-300 rounded-2xl bg-opacity-90">
						<IonIcon icon={create} className="w-32 mr-2 text-7xl" />
						<p className="w-full text-xl font-semibold text-left">Edit/Add cats</p>
					</button>
				</div>
			</IonContent>
		</IonPage>
	);
};

export default Admin;