import { IonPage, IonContent, IonButton, IonRouterLink } from "@ionic/react";

const Landing: React.FC = () => {
	return (
		<IonPage>
			<IonContent>
				<div className="h-full bg-cover-cat">
					<div className="h-full bg-gradient-to-b from-transparent to-black">
						<div className="flex flex-col-reverse h-full mx-5 pb-20">
							<p className="text-sm text-center mb-6 text-white">
								Already a member? <IonRouterLink routerLink="/signin" routerDirection="forward">Sign in</IonRouterLink>
							</p>
							<IonButton
								className="mx-5 h-14 mb-6 cursor-pointer font-bold"
								color="primary"
								expand="block"
								routerLink="/signup"
								routerDirection="forward"
								>
								Join our community
							</IonButton>
							<p className="text-3xl mb-6 font-bold text-center text-white">Insert tagline here</p>
						</div>
					</div>
				</div>
			</IonContent>
		</IonPage>
	);
}

export default Landing;