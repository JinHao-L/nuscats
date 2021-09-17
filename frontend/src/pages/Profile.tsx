import { IonBackButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonModal, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { settingsOutline } from "ionicons/icons";
import { ImageDetail, ImageGallery } from "components/ImageGallery";
import { Link } from "react-router-dom";


const Profile: React.FC = () => {
	// Dummy data
	const profilePicUrl = "https://placekitten.com/80/80";
	const username = "Username here";
	const fullname = "Full name here";
	const sightings = 300;
    const placeholderCatImgGalleryDetails: ImageDetail[] =
        Array.from({ length: 16 })
            .map((_, idx) => ({
                altText: `cat pic ${idx}`,
                src: `http://placekitten.com/${400 + idx}/${300 + idx}`
            }))

	return(
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>
						Profile
					</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<div className="h-full mx-5 flex flex-col">
					<div className="flex justify-end">
						<Link to="/profile/settings">
							<IonIcon icon={settingsOutline} className="mt-6" />
						</Link>
					</div>
					<div className="border mt-2 bg-primary-400 rounded-3xl p-5">
						<div className="flex">
							<img src={profilePicUrl} alt="profile pic" className="h-20 w-20 border-2 border-white rounded-3xl rounded-3xl" />
							<div className="ml-3 w-full">
								<p className="text-xl font-bold text-white">{username}</p>
								<p className="text-white">{fullname}</p>
							</div>
						</div>
						<div className="flex justify-center mt-5">
							<div className="text-center text-tertiary-200">
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