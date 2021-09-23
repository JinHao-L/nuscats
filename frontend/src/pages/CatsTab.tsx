import { RefresherEventDetail } from '@ionic/core';
import { IonContent, IonPage, IonRefresher, IonRefresherContent, IonSpinner } from '@ionic/react';
import CatCard from 'components/CatCard';
import NavBar from 'components/NavBar';
import { useCats } from 'hooks/useCats';
import React, { useCallback, useEffect } from 'react';

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
            <NavBar title="Cats" />
            <IonContent>
                <IonRefresher slot="fixed" onIonRefresh={doRefreshCats}>
                    <IonRefresherContent ></IonRefresherContent>
                </IonRefresher>

                <div className="grid w-full h-full grid-flow-row grid-cols-1 gap-4 px-3 mt-4 sm:grid-cols-2 lg:grid-cols-3">
                    {cats?.length === 0 &&
                        <div className="flex items-center justify-center w-full h-full">
                            <p className="text-xl font-medium text-gray-800">
                                No cats found 😿
                            </p>
                        </div>
                    }
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

export default React.memo(CatsTab);
