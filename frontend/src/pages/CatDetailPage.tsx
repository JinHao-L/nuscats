import { useContext } from "react";
import {
    IonContent,
    IonFab,
    IonFabButton,
    IonIcon,
    IonPage,
    IonicSwiper,
    NavContext
} from "@ionic/react"
import { close, locationOutline, timeOutline } from "ionicons/icons"
import SwiperCore, { Navigation, Pagination } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import { makeCat, UniversityZone } from "@api/cats"
import type { Cat } from "@api/cats"
import { CatSighting, makeSighting, SightingType } from "@api/sightings"
import { ConvenientDateTimeFormatOptions } from 'lib/datetime'
import { ImageGallery, } from 'components/ImageGallery'
import type { ImageDetail } from 'components/ImageGallery'

import 'swiper/swiper-bundle.min.css'
import 'swiper/components/navigation/navigation.min.css'
import 'swiper/components/pagination/pagination.min.css'


interface CatDetailsProps {
  cat: Cat;
}

const CatDetailPage: React.FC<CatDetailsProps> = ({ cat }) => {
  SwiperCore.use([IonicSwiper, Navigation, Pagination]);

  cat = cat
    ? cat
    : makeCat({
        id: 1,
        name: "Sourplum",
        description:
          "I am a sweet kitty and I warm up to people once I spend some time with them.\n\n" +
          "I am a tortoise shell so my fur coat is made out out of a lovely mix of shades.\n\n" +
          "I think that makes me quite unique! I might be a bit shy initially but I'm actually quite vocal and friendly. Maybe you can approach me slowly at first so I know you're just trying to be friends with me. Come find me at the Loading Bay at UTown. We are fed daily around 5.30pm to 8.30pm!",
        one_liner:
          "Bachelor's in Laziness, Masters's in Belly Flops and PhD in Napping",
        zone: UniversityZone.Arts,
    })

    const sightings: CatSighting[] = [
      makeSighting({
        id: 1,
        image: "https://placekitten.com/1000/1000",
        description: "A cat in its natural habitat 😺",
        location: { type: "Point", coordinates: [1, 2, 3] },
        type: SightingType.CatSighted,
      }),
      makeSighting({
        id: 1,
        image: "https://placekitten.com/1001/1000",
        description: "Cat looks like it's injured 😿",
        location: { type: "Point", coordinates: [1, 2, 3] },
        type: SightingType.Emergency,
      }),
    ];

    const { goBack } = useContext(NavContext)
    const subPages = ["About", "Location", "Photos"]

    const placeholderCatImgUrl = "https://images.unsplash.com/photo-1598935888738-cd2622bcd437?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
    const placeholderCatImgGalleryDetails: ImageDetail[] =
        Array.from({ length: 16 })
            .map((_, idx) => ({
                altText: `cat pic ${idx}`,
                src: `http://placekitten.com/${400 + idx}/${300 + idx}`
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
                <img src={placeholderCatImgUrl}
                    alt="extremely cute cat"
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
            </IonContent>
        </IonPage >
    )
}


type CatAboutProps = Pick<Cat, "one_liner" | "description">;

const CatAbout: React.FC<CatAboutProps> = ({ one_liner, description }) => {
  return (
    <div className="flex flex-col space-y-4 overflow-y-auto h-cat-profile-content px-7">
      <h2 className="px-1 py-2 italic font-semibold text-center bg-gray-200 rounded shadow-sm text-primary-400">
        {one_liner}
      </h2>
      <p className="px-5 text-sm text-justify text-gray-700 whitespace-pre-wrap">
        {description}
      </p>
    </div>
  );
};

type CatLocationProps = {
  sightings: CatSighting[];
};

const CatLocation: React.FC<CatLocationProps> = ({ sightings }) => {
  return sightings ? (
    <div className="flex flex-col items-center justify-start w-full space-y-3 overflow-auto px-7 h-cat-profile-content">
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
                className="object-cover w-24 h-24 my-3 rounded-full"
                src={sighting.image}
                alt="cat spotted at"
              />
            </div>
            <div className="flex flex-col justify-start w-full ml-4">
              {sighting.type !== SightingType.Emergency ? (
                <p className="text-base font-medium">Spotted</p>
              ) : (
                <p className="text-base font-medium text-red-700">Emergency!</p>
              )}
              <div className="flex items-center space-x-2">
                <IonIcon color="primary" icon={timeOutline} />

                <p className="text-sm text-gray-800">
                  {new Intl.DateTimeFormat(
                    "en-GB",
                    ConvenientDateTimeFormatOptions
                  ).format(sighting.created_at)}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <IonIcon color="secondary" icon={locationOutline} />
                {/* TODO: resolve to actual location */}
                <p className="text-sm text-gray-800">
                  {sighting.location.coordinates}
                </p>
              </div>
              <div className="w-full h-full px-2 py-1 mt-1 rounded shadow-inner opacity-80 bg-secondary-50 ">
                <p className="text-sm text-gray-800 line-clamp-2">
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
