import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInfiniteScroll, IonInfiniteScrollContent, IonPage, IonRouterLink, IonSpinner, IonTitle, IonToolbar } from "@ionic/react";
import { settingsOutline } from "ionicons/icons";
import { ImageDetail, ImageGallery } from "components/ImageGallery";
import { PROFILE_SETTINGS_ROUTE, SIGNIN_ROUTE } from "app/routes";
import useAuth from "hooks/useAuth";
import { useEffect } from "react";
import { useSightings, UseSightingsOptions } from "hooks/useSightings";
import { CatSighting } from "@api/sightings";
import { Profile } from "@api/profiles";
import { User } from "@api/users";


const ProfileTab: React.FC = () => {
	// Dummy data
	const profilePicUrl = "https://placekitten.com/80/80";
	// Fetch profile data
  	const { isLoggedIn, userId, userProfile, setLogin, setLogout } = useAuth();
	// Fetch sightings data
	var queryOptions: UseSightingsOptions = { limit: 18, page: 1, }
	if (userProfile) {
		queryOptions.ownerIds = [userProfile.uuid];
	}
	const { sightings, error, mutate, isLoading, pageSize, setPageSize } =
		useSightings(queryOptions);
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

	if (!userProfile) {
		return (
			<IonPage>
				<IonHeader>
					<IonTitle>
						Profile
					</IonTitle>
				</IonHeader>
				<IonContent>
					<div className="flex flex-col justify-center h-full">
						<p className="text-xl font-semibold text-center text-secondary-500">
							Profile data not available
						</p>
					</div>
				</IonContent>
			</IonPage>
		);
	}

	const username = (userProfile.user as User).username;
	const fullname = userProfile.first_name as string + " " + userProfile.last_name as string;

	var galleryDisplay;
	if (!sightings) {
		galleryDisplay = (
			<div className="flex items-center justify-center w-full h-full">
				<IonSpinner />
			</div>
		);
	} else {
		const catImgGalleryDetails: ImageDetail[] = 
		(sightings as CatSighting[]).map((sighting, idx) => ({
			altText: `cat pic ${idx}`,
			src: sighting.image, 
		}));
		galleryDisplay = (
			<ImageGallery details={catImgGalleryDetails} withoutBorder />	
		);
	}

	const doLoadMoreSightings = async (event: CustomEvent<void>) => {
		const originalPage = pageSize;
		const data = await setPageSize(originalPage + 1);
		
		const target = (event.target as HTMLIonInfiniteScrollElement);
		setTimeout(() => {
		target.complete();
		console.log(data)
		if (data && data.length === originalPage) {
			target.disabled = true
		}
		}, 1000)
	};

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
				<div className="flex flex-col h-full mx-5 my-5">
					<div className="p-5 mt-2 border shadow-xl bg-secondary-200 rounded-3xl">
						<div className="flex">
							<img src={userProfile.profile_pic} alt="profile pic" className="object-cover w-20 h-20 border-2 border-white rounded-3xl" />
							<div className="w-full ml-3">
								<p className="text-xl font-bold">{username}</p>
								<p>{fullname}</p>
							</div>
						</div>
					</div>
					<div className="mt-5">
						{galleryDisplay}
					</div>
					<IonInfiniteScroll
						threshold="100px"
						onIonInfinite={doLoadMoreSightings}
					>
						<IonInfiniteScrollContent loadingText="Loading more kitty sightings..."></IonInfiniteScrollContent>
					</IonInfiniteScroll>
				</div>
			</IonContent>
		</IonPage>
	);
};

export default ProfileTab;