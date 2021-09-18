import { IonIcon, IonRouterLink } from '@ionic/react'
import { locationOutline } from 'ionicons/icons'
import { Cat } from '@api/cats'
import { PlaceholderCatUrl } from 'lib/utils'
import { CAT_ROUTE } from 'app/routes'

interface CatCardProps {
    cat: Cat
}

const CatCard: React.FC<CatCardProps> = ({ cat }) => {
    const placerHolderCatImgUrl = PlaceholderCatUrl(200 + cat.id, 210 + cat.id)

    return (
        <IonRouterLink routerLink={`${CAT_ROUTE}/${cat.id}`}>
            <div className="flex justify-between px-4 mx-5 mt-5 shadow-xl bg-secondary-100 rounded-2xl bg-opacity-90">
                <div className="flex-shrink-0 mb-4 mt-7">
                    <img className="object-cover w-24 h-24 rounded-full" src={placerHolderCatImgUrl} alt="very cute cat"></img>
                </div>
                <div className="flex flex-col justify-start flex-auto mt-5 mb-4 ml-4">
                    <p className="text-xl font-semibold text-gray-700">{cat.name}</p>
                    <div className="flex items-center mt-1">
                        <IonIcon color="secondary" icon={locationOutline}></IonIcon>
                        <p className="ml-1 text-sm font-semibold text-secondary-500">Tembusu</p>
                    </div>
                    <p className="mt-2 text-sm font-medium text-gray-600 line-clamp-2">{cat.description}</p>
                </div>
            </div>
        </IonRouterLink>
    )
}

export default CatCard