
import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from "@ionic/react";


const ChangePassword: React.FC = () => {
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonButtons slot="start">
						<IonBackButton />
					</IonButtons>
					<IonTitle>
						Change password 
					</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<div className="h-full mt-10">
					<div className="block mx-5 mb-6 h-14 bg-gray-200 rounded-xl">
						<label className="block text-gray-700 pl-3 pt-1 text-xs" htmlFor="current">
							Current password	
						</label>
						<input 
							id="current" 
							type="password" 
							className="block w-full border rounded-xl py-1 px-3 bg-gray-200 focus:outline-none" 
						/>
					</div>
					<div className="block mx-5 mb-6 h-14 bg-gray-200 rounded-xl">
						<label className="block text-gray-700 pl-3 pt-1 text-xs" htmlFor="newPw">
							New password	
						</label>
						<input 
							id="newPw" 
							type="password" 
							className="block w-full border rounded-xl py-1 px-3 bg-gray-200 focus:outline-none" 
						/>
					</div>
					<div className="block mx-5 mb-6 h-14 bg-gray-200 rounded-xl">
						<label className="block text-gray-700 pl-3 pt-1 text-xs" htmlFor="confirm">
							Confirm password	
						</label>
						<input 
							id="confirm" 
							type="password" 
							className="block w-full border rounded-xl py-1 px-3 bg-gray-200 focus:outline-none" 
						/>
					</div>
					<IonButton 
						className="mx-5 h-14 cursor-pointer text-lg text-white"
						color="primary"
						expand="block"
					>
						Update password 
					</IonButton>
				</div>
			</IonContent>
		</IonPage>
	);
};

export default ChangePassword;