import { IonToast } from '@ionic/react'
import { useState } from 'react'
import { Offline } from 'react-detect-offline'

const OfflineToast: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(true);

    return (
        <Offline>
            <IonToast
                isOpen={isOpen}
                onDidDismiss={() => setIsOpen(false)}
                position='bottom'
                message='You are currently offline! We will still show saved data, but fresh data may not show up. You will also be unable to upload new sightings.'
                duration={5500}
            />
        </Offline>
    )

}

export default OfflineToast