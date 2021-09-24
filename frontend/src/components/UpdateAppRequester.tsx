import {
    withServiceWorkerUpdater,
    ServiceWorkerUpdaterProps
} from '@3m1/service-worker-updater'
import { IonAlert } from '@ionic/react'

const Updater = (props: ServiceWorkerUpdaterProps) => {
    const { newServiceWorkerDetected, onLoadNewServiceWorkerAccept } = props

    return (
        <IonAlert
            isOpen={newServiceWorkerDetected}
            header="A new version of NUSCats is available!"
            message="Please refresh the page to use the new version"
            buttons={[
                {
                    text: 'Cancel',
                    cssClass: 'tertiary',
                    handler: () => console.log("update cancelled")
                },
                {
                    text: 'Ok',
                    handler: () => onLoadNewServiceWorkerAccept()
                }
            ]}
        />
    )
}

export default withServiceWorkerUpdater(Updater)