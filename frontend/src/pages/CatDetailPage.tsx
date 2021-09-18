import { useContext } from "react";
import {
    IonContent,
    IonFab,
    IonFabButton,
    IonIcon,
    IonPage,
    IonicSwiper,
    NavContext,
    IonSpinner
} from "@ionic/react"
import { close, locationOutline, timeOutline } from "ionicons/icons"
import SwiperCore, { Navigation, Pagination } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import type { Cat } from "@api/cats"
import { CatSighting, makeSighting, SightingType } from "@api/sightings"
import { ConvenientDateTimeFormatOptions } from 'lib/datetime'
import { ImageGallery, } from 'components/ImageGallery'
import type { ImageDetail } from 'components/ImageGallery'

import 'swiper/swiper-bundle.min.css'
import 'swiper/components/navigation/navigation.min.css'
import 'swiper/components/pagination/pagination.min.css'
import { PlaceholderCatUrl } from 'lib/utils'
import { RouteComponentProps, matchPath } from "react-router";
import { useCat } from "hooks/useCats";


interface CatDetailsPageProps extends RouteComponentProps<{ id: string }> { }

const CatDetailPage: React.FC<CatDetailsPageProps> = ({ history }) => {
    SwiperCore.use([IonicSwiper, Navigation, Pagination]);

    // workaround to unfixed bug with react router: https://github.com/remix-run/react-router/issues/5870
    const match = matchPath<{ id: string }>(history.location.pathname, {
        path: '/cats/:id(\\d+)',
        exact: true,
        strict: false
    })

    const { cat, notFound, error, isLoading } = useCat(parseInt(match?.params.id || "NaN"))

    const sightings = [
        makeSighting({
            id: 1,
            image: PlaceholderCatUrl(1000, 1000),
            description: "A cat in its natural habitat 😺",
            location: { type: "Point", coordinates: [1, 2, 3] },
            type: SightingType.CatSighted
        }),
        makeSighting({
            id: 1,
            image: PlaceholderCatUrl(1001, 1000),
            description: "Cat looks like it's injured 😿",
            location: { type: "Point", coordinates: [1, 2, 3] },
            type: SightingType.Emergency
        })
    ]

    const { goBack } = useContext(NavContext)
    const subPages = ["About", "Location", "Photos"]

    const placeholderCatImgGalleryDetails: ImageDetail[] =
        Array.from({ length: 16 })
            .map((_, idx) => ({
                altText: `cat pic ${idx}`,
                src: PlaceholderCatUrl(400 + idx, 300 + idx)
            }))

    return (
        <IonPage>

            <IonContent scrollY={false}>
                <IonFab vertical="top" horizontal="start" slot="fixed">
                    <IonFabButton
                        className="opacity-90"
                        size="small"
                        color="medium"
                        translucent
                        onClick={_ => goBack("/cats")}
                    >
                        <IonIcon icon={close} />
                    </IonFabButton>
                </IonFab>
                {cat &&
                    <>
                        <img src={cat.image}
                            alt={`big pic of cat ${cat.name}`}
                            className="absolute top-0 left-0 z-0 object-cover object-center"
                        />

                        <div className="relative w-full h-full mt-20 overflow-scroll snap rounded-3xl">
                            <div className="w-full h-1/3 snap-start" />
                            <div className="h-full overflow-hidden bg-gray-100 rounded-3xl snap-start">
                                <div className="flex flex-col items-center h-20 px-3 pt-4">
                                    <h1 className="text-2xl font-semibold font-gray-900">{cat.name}</h1>
                                    <div className="h-0.5 w-full mt-3 bg-gray-200 rounded-md" />
                                </div>
                                <Swiper
                                    spaceBetween={20}
                                    allowTouchMove={false}
                                    pagination={{
                                        clickable: true,
                                        el: '.pagination-container',
                                        renderBullet: function (index, className) {
                                            return `<div class="w-20 h-auto py-2 bg-gray-700 rounded-lg ${className}">${subPages[index]}</div>`;
                                        }
                                    }}
                                >
                                    <div slot="container-start"
                                        className="flex justify-center mb-5 text-sm font-medium tracking-wide text-center text-white space-x-7 pagination-container"
                                    />
                                    <SwiperSlide>
                                        <CatAbout {...cat} />
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <CatLocation sightings={sightings} />
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className="h-cat-profile-content">
                                            <ImageGallery details={placeholderCatImgGalleryDetails} />
                                        </div>
                                    </SwiperSlide>
                                </Swiper>
                            </div>
                        </div>
                    </>
                }
                {error &&
                    <div className="flex items-center justify-center w-full h-full">
                        <p className="font-medium text-red-600">
                            {notFound ? "Cat not found" : "Error loading cat"}
                        </p>
                    </div>
                }
                {isLoading &&
                    <div className="flex items-center justify-center w-full h-full">
                        <IonSpinner />
                    </div>
                }
            </IonContent>
        </IonPage >
    )
}


type CatAboutProps = Pick<Cat, "one_liner" | "description" | "zone">;

const CatAbout: React.FC<CatAboutProps> = ({ one_liner, description, zone }) => {
    return (
        <section className="flex flex-col space-y-4 overflow-y-auto h-cat-profile-content px-7">
            <h2 className="font-semibold text-center text-gray-900 transform -skew-x-6">
                <span className="bg-gray-200 shadow-sm">"{one_liner}"</span>
            </h2>
            <div className="flex justify-start px-4 py-2 space-x-6">
                <div className="text-xs font-medium text-gray-400">
                    Hangs out around
                    <p className="text-base font-semibold text-primary-500">{zone}</p>
                </div>
                <div className="text-xs font-medium text-gray-400">
                    Last spotted at
                    <p className="text-base font-semibold text-primary-500">some place</p>
                </div>
            </div>

            <div className="px-4 pt-2 rounded-md bg-warmGray-100">
                <p className="text-sm tracking-tight text-justify text-gray-700 whitespace-pre-wrap">
                    {description}
                </p><br />
            </div>
        </section>
    );
};

type CatLocationProps = {
    sightings: CatSighting[];
};

const CatLocation: React.FC<CatLocationProps> = ({ sightings }) => {
    return sightings ? (
        <div className="flex flex-col items-center justify-start w-full px-4 space-y-3 overflow-auto h-cat-profile-content">
            {sightings.map((sighting, idx) => {
                const bgColor =
                    sighting.type === SightingType.Emergency
                        ? "bg-red-100"
                        : "bg-secondary-100";
                return (
                    <div
                        className={`flex items-center justify-start w-full px-2 rounded-md shadow-md ${bgColor} bg-opacity-90`}
                        key={idx}
                    >
                        <div className="flex-shrink-0">
                            <img
                                className="object-cover w-20 h-20 my-3 rounded-full"
                                src={sighting.image}
                                alt="cat spotted at"
                            />
                        </div>
                        <div className="flex flex-col justify-start w-full mt-1 ml-3">
                            {sighting.type !== SightingType.Emergency ? (
                                <p className="text-base font-medium">Spotted</p>
                            ) : (
                                <p className="text-base font-medium text-red-700">Emergency!</p>
                            )}
                            <div className="flex items-center space-x-2">
                                <IonIcon color="primary" icon={timeOutline} />

                                <p className="text-xs text-gray-800">
                                    {new Intl.DateTimeFormat(
                                        "en-GB",
                                        ConvenientDateTimeFormatOptions
                                    ).format(sighting.created_at)}
                                </p>
                            </div>
                            <div className="flex items-center mt-1 space-x-2">
                                <IonIcon color="secondary" icon={locationOutline} />
                                {/* TODO: resolve to actual location */}
                                <p className="text-xs text-gray-800">
                                    {sighting.location.coordinates}
                                </p>
                            </div>
                            <div className="w-full h-full pb-1 m-1 rounded opacity-80 ">
                                <p className="text-sm font-medium tracking-tight text-gray-800 line-clamp-2">
                                    {sighting.description}
                                </p>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    ) : (
        <div className="flex justify-center">
            <p className="mt-16 text-xl font-semibold text-gray-700">
                No cats sightings 😿
            </p>
        </div>
    );
};

export default CatDetailPage
