import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar, AlertOptions, useIonAlert } from "@ionic/react";
import { locationOutline } from "ionicons/icons";
import { PlaceholderCatUrl } from "lib/utils";
import { Cat, makeCat, UniversityZone } from '@api/cats';
import MiniCatCard from "components/MiniCatCard";

const RequestLocation: React.FC = () => {
	// Dummy data
	const catImgUrl = PlaceholderCatUrl(200, 210);
	const cats: Cat[] = [
		makeCat({
		id: 1,
		name: "Garfield",
		neutered: false,
		one_liner: "Fluffy bowling ball",
		description: "I am a strong and healthy boy! I have black and white fur and I love to sleep :)",
		zone: UniversityZone.Arts
		}),
		makeCat({
		id: 2,
		name: "Ashy",
		neutered: false,
		one_liner: "Bachelor's in Laziness, Masters's in Belly Flops and PhD in Napping",
		description: "I sleep most of the day for a very good excuse- that’s what I’m wired to do! When most of you are just waking up, or rushing for that 8am tutorial, I am starting the day with a snooze. You might pass me by on the way to the UTown bus stop, at the steps outside UTR. You can probably approach me quietly for a little pat and rub, but please don’t poke me awake – I need my catnaps.",
		zone: UniversityZone.Utown
		}),
		makeCat({
		id: 3,
		name: "Ashy",
		description: "I sleep most of the day for a very good excuse- that’s what I’m wired to do! When most of you are just waking up, or rushing for that 8am tutorial, I am starting the day with a snooze. You might pass me by on the way to the UTown bus stop, at the steps outside UTR. You can probably approach me quietly for a little pat and rub, but please don’t poke me awake – I need my catnaps.",
		zone: UniversityZone.Utown
		}),
		makeCat({
		id: 4,
		name: "Ashy",
		description: "I sleep most of the day for a very good excuse- that’s what I’m wired to do! When most of you are just waking up, or rushing for that 8am tutorial, I am starting the day with a snooze. You might pass me by on the way to the UTown bus stop, at the steps outside UTR. You can probably approach me quietly for a little pat and rub, but please don’t poke me awake – I need my catnaps.",
		zone: UniversityZone.Utown
		})
	]


	const alertOptions: AlertOptions = {
		header: "Request location for Ashy?",
		message: "This will send a notification to all users to keep a lookout!",
		buttons: [
			"Cancel",
			{text: "Confirm", }
		],
	}
	
	const [present] = useIonAlert();

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonButtons slot="start">
						<IonBackButton defaultHref="/" />
					</IonButtons>
					<IonTitle>
						Request cat location
					</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<div className="flex flex-col h-full mx-5 my-5">
					{cats.map(cat => 
						<MiniCatCard key={cat.id} cat={cat} />
					)}
				</div>
			</IonContent>
		</IonPage>
	);
};
export default RequestLocation;