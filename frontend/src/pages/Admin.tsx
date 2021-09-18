import { IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { compass, create, megaphone } from "ionicons/icons";
import { Link } from "react-router-dom";

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
					<Link to="/admin/announcement">
						<button className="flex items-center w-full h-40 px-4 mb-5 shadow-xl active:bg-primary-400 bg-primary-300 rounded-2xl bg-opacity-90">
							<IonIcon icon={megaphone} className="w-32 mr-2 text-7xl" />
							<p className="w-full text-xl font-semibold text-left">Broadcast announcement</p>
						</button>
					</Link>
					<button className="flex items-center w-full h-40 px-4 mb-5 shadow-xl active:bg-secondary-500 bg-secondary-400 rounded-2xl bg-opacity-90">
						<IonIcon icon={compass} className="w-32 mr-2 text-7xl" />
						<p className="w-full text-xl font-semibold text-left">Request cat location</p>
					</button>
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