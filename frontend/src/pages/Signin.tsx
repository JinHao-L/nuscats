import { IonButton, IonContent, IonHeader, IonIcon, IonPage, IonRouterLink, IonTitle, IonToolbar } from "@ionic/react";
import { arrowBackOutline } from "ionicons/icons";

const Signin: React.FC = () => {
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Signup</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonIcon icon={arrowBackOutline} size="large" className="ml-3 mt-3" />
				<div className="mx-5 mb-5 mt-2">
					<p className="text-3xl font-bold mb-1">Welcome back!</p>
					<p>NUS cats are waiting for you</p>
				</div>
				<form className="flex flex-col mt-5">
					<div className="block mx-5 mb-6 h-14 bg-gray-200 rounded-xl">
						<label className="block text-gray-700 pl-3 pt-1 text-xs" htmlFor="email">
							Email
						</label>
						<input 
							id="email" 
							type="email" 
							className="block w-full border rounded-xl py-1 px-3 bg-gray-200 focus:outline-none" 
						/>
					</div>
					<div className="block mx-5 mb-6 h-14 bg-gray-200 rounded-xl">
						<label className="block text-gray-700 pl-3 pt-1 text-xs" htmlFor="password">
							Password	
						</label>
						<input 
							id="password" 
							type="password" 
							className="block w-full border rounded-xl py-1 px-3 bg-gray-200 focus:outline-none" 
						/>
					</div>
				</form>
				<IonButton 
					className="mx-5 h-14 cursor-pointer text-lg text-white"
					color="primary"
					expand="block"
				>
					Sign in
				</IonButton>
				<div className="w-full text-center mt-5">
					<IonRouterLink>
						Forgot your password?
					</IonRouterLink>
				</div>
			</IonContent>
		</IonPage>
	);
}

export default Signin;