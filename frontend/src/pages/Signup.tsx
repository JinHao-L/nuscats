import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonPage, IonToolbar } from "@ionic/react";
import { ROOT_ROUTE } from "app/routes";

const Signup: React.FC = () => {
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonButtons slot="start">
						<IonBackButton defaultHref="/" />
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<div className="mx-5 mt-2 mt-5 mb-5">
					<p className="mb-1 text-3xl font-bold">Join the awesome cat community</p>
					<p>Fill in your details to begin</p>
				</div>
				<form className="flex flex-col mt-5">
					<div className="block mx-5 mb-6 bg-gray-200 h-14 rounded-xl">
						<label className="block pt-1 pl-3 text-xs text-gray-700" htmlFor="email">
							Email
						</label>
						<input
							id="email"
							type="email"
							className="block w-full px-3 py-1 bg-gray-200 border rounded-xl focus:outline-none"
						/>
					</div>
					<div className="block mx-5 mb-6 bg-gray-200 h-14 rounded-xl">
						<label className="block pt-1 pl-3 text-xs text-gray-700" htmlFor="username">
							Username
						</label>
						<input
							id="username"
							type="text"
							className="block w-full px-3 py-1 bg-gray-200 border rounded-xl focus:outline-none"
						/>
					</div>
					<div className="block mx-5 mb-6 bg-gray-200 h-14 rounded-xl">
						<label className="block pt-1 pl-3 text-xs text-gray-700" htmlFor="password">
							Password
						</label>
						<input
							id="password"
							type="password"
							className="block w-full px-3 py-1 bg-gray-200 border rounded-xl focus:outline-none"
						/>
					</div>
					<div className="block mx-5 mb-6 bg-gray-200 h-14 rounded-xl">
						<label className="block pt-1 pl-3 text-xs text-gray-700" htmlFor="cfmPassword">
							Confirm password
						</label>
						<input
							id="cfmPassword"
							type="password"
							className="block w-full px-3 py-1 bg-gray-200 border rounded-xl focus:outline-none"
						/>
					</div>
				</form>
				<IonButton
					className="mx-5 text-lg text-white cursor-pointer h-14"
					color="primary"
					expand="block"
					routerLink={ROOT_ROUTE}
					routerDirection="forward"
				>
					Sign up
				</IonButton>
				<p className="my-2 text-lg font-semibold text-center">
					or
				</p>
				<IonButton
					className="mx-5 mb-3 text-lg cursor-pointer h-14"
					color="facebook"
					expand="block"
					routerLink={ROOT_ROUTE}
					routerDirection="forward"
				>
					Connect with Facebook
				</IonButton>
				<IonButton
					className="mx-5 mb-3 text-lg text-black cursor-pointer h-14"
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