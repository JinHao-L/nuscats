import { IonPage, IonContent, IonButton, IonRouterLink } from "@ionic/react";

const Landing: React.FC = () => {
	return (
		<IonPage>
			<IonContent>
				<div className="flex flex-col-reverse h-full mx-5 pb-20">
					<p className="text-sm text-center mb-6">
						Already a member? <IonRouterLink>Sign in</IonRouterLink>
					</p>
					<IonButton
						className="mx-5 h-14 mb-6 cursor-pointer font-bold"
						color="primary"
						expand="block"
					>
						Join our community
					</IonButton>
					<p className="text-3xl mb-6 font-bold text-center">Insert tagline here</p>
				</div>
			</IonContent>
		</IonPage>
	);
}

export default Landing;