import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonPage, IonToolbar } from "@ionic/react";
import { ROOT_ROUTE } from "app/routes";

const Signup: React.FC = () => {
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonButtons slot="start">
						<IonBackButton />
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<div className="mx-5 mt-5 mb-5 mt-2">
					<p className="text-3xl font-bold mb-1">Join the awesome cat community</p>
					<p>Fill in your details to begin</p>
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
						<label className="block text-gray-700 pl-3 pt-1 text-xs" htmlFor="username">
							Username	
						</label>
						<input 
							id="username" 
							type="text" 
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
					<div className="block mx-5 mb-6 h-14 bg-gray-200 rounded-xl">
						<label className="block text-gray-700 pl-3 pt-1 text-xs" htmlFor="cfmPassword">
							Confirm password	
						</label>
						<input 
							id="cfmPassword" 
							type="password" 
							className="block w-full border rounded-xl py-1 px-3 bg-gray-200 focus:outline-none" 
						/>
					</div>
				</form>
				<IonButton 
					className="mx-5 h-14 cursor-pointer text-lg text-white"
					color="primary"
					expand="block"
					routerLink={ROOT_ROUTE}
					routerDirection="forward"
				>
					Sign up
				</IonButton>
				<p className="my-2 text-center text-lg font-semibold">
					or
				</p>
				<IonButton
					className="mx-5 h-14 mb-3 cursor-pointer text-lg"
					color="facebook"
					expand="block"
					routerLink={ROOT_ROUTE}
					routerDirection="forward"
				>
					Connect with Facebook
				</IonButton>
				<IonButton
					className="mx-5 h-14 mb-3 cursor-pointer text-lg text-black"
					expand="block"
					color="white"
					routerLink={ROOT_ROUTE}
					routerDirection="forward"
				>
					Connect with Google
				</IonButton>
			</IonContent>
		</IonPage>
	);
}

export default Signup;