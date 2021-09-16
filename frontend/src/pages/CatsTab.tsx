import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import CatCard from 'components/CatCard';
import { Cat, makeCat, UniversityZone } from '@api/cats';

const CatsTab: React.FC = () => {
  // Mock data
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

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Cats</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Cats</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div>
          {cats.map(cat =>
            <div key={cat.id} className="mt-6">
              <CatCard cat={cat} ></CatCard>
            </div>)}
        </div>
      </IonContent>
    </IonPage >
  )
};

export default CatsTab;
