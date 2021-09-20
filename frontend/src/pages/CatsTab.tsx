import { RefresherEventDetail } from '@ionic/core';
import { IonContent, IonHeader, IonList, IonPage, IonRefresher, IonRefresherContent, IonSpinner, IonTitle, IonToolbar } from '@ionic/react';
import CatCard from 'components/CatCard';
import { useCats } from 'hooks/useCats';
import { useCallback, useEffect } from 'react';

const CatsTab: React.FC = () => {

    const { cats, error, isLoading, mutate } = useCats()

    useEffect(() => {
        error && console.log({ error })
    }, [error])

    const doRefreshCats = useCallback((event: CustomEvent<RefresherEventDetail>) => {
        mutate()
        setTimeout(() => {
            if (!isLoading) {
                event.detail.complete()
            }
        }, 1000)
    },
        [mutate, isLoading],
    )

    return (
        <IonPage>
            <IonHeader translucent>
                <IonToolbar>
                    <IonTitle>Cats</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonRefresher slot="fixed" onIonRefresh={doRefreshCats}>
                    <IonRefresherContent ></IonRefresherContent>
                </IonRefresher>

                <div className="flex flex-col justify-start w-full h-full px-3 mt-4 space-y-2">
                    {cats?.map(cat =>
                        <div className="w-full" key={cat.id}>
                            <CatCard cat={cat} ></CatCard>
                        </div>)}

                    {error &&
                        <div className="flex items-center justify-center w-full h-full">
                            <p className="font-medium text-red-600">
                                Error loading cats, please try again
                            </p>
                        </div>
                    }
                    {isLoading &&
                        <div className="flex items-center justify-center w-full h-full">
                            <IonSpinner />
                        </div>
                    }
                </div>
            </IonContent>
        </IonPage >
    )
};

export default CatsTab;
