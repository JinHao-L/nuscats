import { IonIcon } from '@ionic/react'
import { locationOutline } from 'ionicons/icons'
import { Cat } from '../../../backend/src/cats/cat.entity'

interface CatCardProps {
    cat: Cat
}

const CatCard: React.FC<CatCardProps> = ({ cat }) => {
    const placerHolderCatImgUrl = "https://images.unsplash.com/photo-1586042091284-bd35c8c1d917?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"

    return (
        <div className="mx-5 mt-5 px-4 flex justify-between bg-gray-200 rounded-2xl shadow-xl">
            <div className="mt-7 mb-4 flex-shrink-0">
                <img className="h-24 w-24 object-cover rounded-full" src={placerHolderCatImgUrl} alt="very cute cat"></img>
            </div>
            <div className="ml-4 mt-5 mb-4 flex flex-col flex-auto justify-start">
                <p className="text-xl text-gray-700 font-semibold">{cat.name}</p>
                <div className="mt-1 flex items-center">
                    <IonIcon color="primary" icon={locationOutline}></IonIcon>
                    <p className="ml-1 text-sm text-blue-500 font-semibold">Tembusu</p>
                </div>
                <p className="mt-2 text-gray-800 line-clamp-2">{cat.description}</p>
            </div>
        </div>
    )
}

export default CatCard