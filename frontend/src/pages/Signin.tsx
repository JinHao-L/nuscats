import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonPage, IonRouterLink, IonToolbar } from "@ionic/react";

const Signin: React.FC = () => {
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
				<div className="mx-5 mt-5 mb-5">
					<p className="mb-1 text-3xl font-bold">Welcome back!</p>
					<p>NUS cats are waiting for you</p>
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
						<label className="block pt-1 pl-3 text-xs text-gray-700" htmlFor="password">
							Password
						</label>
						<input
							id="password"
							type="password"
							className="block w-full px-3 py-1 bg-gray-200 border rounded-xl focus:outline-none"
						/>
					</div>
				</form>
				<IonButton
					className="mx-5 text-lg text-white cursor-pointer h-14"
					color="primary"
					expand="block"
				>
					Sign in
				</IonButton>
				<div className="w-full mt-5 text-center">
					<IonRouterLink>
						Forgot your password?
					</IonRouterLink>
				</div>
			</IonContent>
		</IonPage>
	);
}

export default Signin;