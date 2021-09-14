import {
    IonContent,
    IonFab,
    IonFabButton,
    IonIcon,
    IonPage,
} from "@ionic/react"
import { close } from "ionicons/icons"
import SwiperCore, { Pagination } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import { Cat, UniversityZone } from "../../../backend/src/cats/cat.entity"

import 'swiper/swiper-bundle.min.css'
import 'swiper/components/pagination/pagination.min.css'

SwiperCore.use([Pagination])

interface CatDetailsProps {
    cat: Cat
}

const CatDetailPage: React.FC<CatDetailsProps> = ({ cat }) => {
    cat = cat ? cat : new Cat({
        id: 1,
        name: "Garfield",
        description: "I am a strong and healthy boy! I have black and white fur and I love to sleep :)",
        zone: UniversityZone.Arts
    })

    const placeholderCatImgUrl = "https://images.unsplash.com/photo-1598935888738-cd2622bcd437?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"

    return (
        <IonPage>
            <IonContent scrollY={false}>
                <IonFab vertical="top" horizontal="start" slot="fixed">
                    <IonFabButton className="opacity-90" size="small" color="medium" translucent>
                        <IonIcon icon={close} />
                    </IonFabButton>
                </IonFab>
                <img src={placeholderCatImgUrl}
                    alt="extremely cute cat"
                    className="object-cover object-center absolute top-0 left-0 z-0"
                />

                <div className="h-full w-full mt-20 relative snap overflow-auto">
                    <div className="h-1/3 w-full snap-start" />
                    <div className="h-full bg-gray-100 rounded-3xl snap-start">
                        <div className="py-4 px-3 flex flex-col items-center">
                            <div className="text-2xl font-semibold font-gray-900">{cat.name}</div>
                            <div className="h-0.5 w-full my-4 bg-gray-200 rounded-md" />
                        </div>
                        <Swiper
                            spaceBetween={20}
                            pagination={{
                                clickable: true,
                                el: '.swiper-pagination',
                                renderBullet: (index, className) => {
                                    return '<span>' + (index) + '</span>';
                                }
                            }}
                        >
                            <div className="swiper-pagination" />
                            <div>
                                <SwiperSlide>
                                    <div className="min-h-36 w-full px-4 mb-8">{cat.description}</div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="h-full w-full">HELLO</div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="h-full w-full">HELLO</div>
                                </SwiperSlide>
                            </div>
                        </Swiper>
                    </div>
                </div>
            </IonContent>
        </IonPage >
    )
}

export default CatDetailPage
