import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonRouterLink, IonTitle, IonToolbar } from "@ionic/react";
import { settingsOutline } from "ionicons/icons";
import { ImageDetail, ImageGallery } from "components/ImageGallery";
import { PROFILE_SETTINGS_ROUTE, SIGNIN_ROUTE } from "app/routes";
import useAuth from "hooks/useAuth";
import { useEffect } from "react";


const Profile: React.FC = () => {
	// Dummy data
	const profilePicUrl = "https://placekitten.com/80/80";
	const sightings = 300;
    const placeholderCatImgGalleryDetails: ImageDetail[] =
        Array.from({ length: 16 })
            .map((_, idx) => ({
                altText: `cat pic ${idx}`,
                src: `http://placekitten.com/${400 + idx}/${300 + idx}`
            }))

	// Fetch profile data
  	const { isLoggedIn, userId, userProfile, setLogin, setLogout } = useAuth();

	// Page to display if user is not signed in
	if (!isLoggedIn) {
		return (
			<IonPage>
				<IonHeader>
					<IonToolbar>
						<IonTitle>
							Profile
						</IonTitle>
					</IonToolbar>
				</IonHeader>
				<IonContent>
					<div className="flex flex-col justify-center h-full">
						<p className="text-xl font-semibold text-center text-secondary-500">
							<IonRouterLink routerLink={SIGNIN_ROUTE}>Sign in</IonRouterLink> to view profile
						</p>
					</div>
				</IonContent>
			</IonPage>
		);
	}

	const username = userProfile?.user?.username;
	const fullname = userProfile?.first_name as string + " " + userProfile?.last_name as string;

	return(
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonButtons slot="end">
						<IonButton
							fill="clear"
							color="secondary"
							slot="icon-only"
							routerLink={PROFILE_SETTINGS_ROUTE}
							size={'large'}
							className="pb-2 pr-2"
						>
							<IonIcon icon={settingsOutline} />
						</IonButton>
					</IonButtons>
					<IonTitle  slot="start" size="large" className="leading-snug">Profile</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<div className="flex flex-col h-full mx-5">
					<div className="p-5 mt-2 border shadow-xl bg-secondary-200 rounded-3xl">
						<div className="flex">
							<img src={profilePicUrl} alt="profile pic" className="w-20 h-20 border-2 border-white rounded-3xl" />
							<div className="w-full ml-3">
								<p className="text-xl font-bold">{username}</p>
								<p>{fullname}</p>
							</div>
						</div>
						<div className="flex justify-center mt-5">
							<div className="text-center text-tertiary-500">
								<p className="text-lg font-semibold">{sightings}</p>
								<p className="text-sm">sightings</p>
							</div>
						</div>
					</div>
					<div className="mt-5">
						<ImageGallery details={placeholderCatImgGalleryDetails} />
					</div>
				</div>
			</IonContent>
		</IonPage>
	);
};

export default Profile;