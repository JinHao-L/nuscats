import { MouseEventHandler, useContext, useRef, useState } from 'react';
import {
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon,
  IonPage,
  IonicSwiper,
  NavContext,
  IonSpinner,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonRouterLink,
} from '@ionic/react';
import { close, locationOutline, timeOutline } from 'ionicons/icons';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Cat, ZoneLocation } from '@api/cats';
import {
  CatSighting,
  CatSightingsResponse,
  SightingType,
} from '@api/sightings';
import { ImageGallery } from 'components/ImageGallery';
import type { ImageDetail } from 'components/ImageGallery';
import TimeAgo from 'timeago-react';

import 'swiper/swiper-bundle.min.css';
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/pagination/pagination.min.css';
import { PlaceholderCatUrl } from 'lib/utils';
import { RouteComponentProps } from 'react-router';
import { useCat } from 'hooks/useCats';

import { CAT_ROUTE } from 'app/routes';
import { Result } from 'lib/api';
import { Position } from 'geojson';
import usePinLocation from 'hooks/usePinLocation';

interface CatDetailsPageProps extends RouteComponentProps<{ id: string }> { }

const CatDetailPage: React.FC<CatDetailsPageProps> = ({ match }) => {
  SwiperCore.use([IonicSwiper, Navigation, Pagination]);

  const {
    cat,
    notFound,
    error,
    catLoading,
    catSightings,
    sightingsError,
    sightingsLoading,
    sightingsPageSize,
    setSightingsPageSize,
  } = useCat(parseInt(match.params.id), { includeSightings: true });

  const { goBack } = useContext(NavContext);
  const subPages = ['About', 'Location', 'Photos'];

  const placeholderCatImgGalleryDetails: ImageDetail[] = Array.from({
    length: 16,
  }).map((_, idx) => ({
    altText: `cat pic ${idx}`,
    src: PlaceholderCatUrl(400 + idx, 300 + idx),
  }));

  return (
    <IonPage>
      <IonContent scrollY={false}>
        <IonFab vertical="top" horizontal="start" slot="fixed">
          <IonFabButton
            className="opacity-90"
            size="small"
            color="medium"
            translucent
            onClick={(_) => goBack(CAT_ROUTE)}
          >
            <IonIcon icon={close} />
          </IonFabButton>
        </IonFab>
        {cat && (
          <>
            <img
              src={cat.image}
              alt={`big pic of cat ${cat.name}`}
              className="absolute top-0 left-0 z-0 object-cover object-center w-full h-1/2"
            />

            <div className="relative w-full h-full mt-20 overflow-scroll snap rounded-3xl">
              <div className="w-full h-1/3 snap-start" />
              <div className="h-full overflow-hidden bg-gray-100 rounded-3xl snap-start">
                <div className="flex flex-col items-center h-20 px-3 pt-4">
                  <h1 className="text-2xl font-semibold font-gray-900">
                    {cat.name}
                  </h1>
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
                    },
                  }}
                >
                  <div
                    slot="container-start"
                    className="flex justify-center mb-5 text-sm font-medium tracking-wide text-center text-white space-x-7 pagination-container"
                  />
                  <SwiperSlide>
                    <CatAbout
                      {...cat}
                      coordinates={catSightings?.[0]?.location?.coordinates}
                      locationName={catSightings?.[0]?.location_name}
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                    <CatLocation
                      sightings={catSightings}
                      error={sightingsError}
                      loading={sightingsLoading}
                      pageSize={sightingsPageSize}
                      setPageSize={setSightingsPageSize}
                    />
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
        )}
        {error && (
          <div className="flex items-center justify-center w-full h-full">
            <p className="font-medium text-red-600">
              {notFound ? 'Cat not found' : 'Error loading cat'}
            </p>
          </div>
        )}
        {catLoading && (
          <div className="flex items-center justify-center w-full h-full">
            <IonSpinner />
          </div>
        )}
        <div className="h-screen bg-red-500">

        </div>
      </IonContent>
    </IonPage>
  );
};

type CatAboutProps = {
  coordinates: Position | undefined;
  locationName: string | undefined;
} & Pick<Cat, 'one_liner' | 'description' | 'zone' | 'name'>;

const CatAbout: React.FC<CatAboutProps> = ({
  name,
  one_liner,
  description,
  zone,
  coordinates,
  locationName,
}) => {
  const [lat, lng] = coordinates || [];
  const { ionRouterLinkProps: mapRouterProps } = usePinLocation(lat, lng, name);
  const [zlat, zlng] = ZoneLocation[zone];
  const { ionRouterLinkProps: zoneRouterProps } = usePinLocation(
    zlat,
    zlng,
    zone,
  );

  return (
    <section className="flex flex-col space-y-4 overflow-y-auto h-cat-profile-content px-7">
      <h2 className="font-semibold text-center text-gray-900 transform -skew-x-6">
        <span className="bg-gray-200 shadow-sm">"{one_liner}"</span>
      </h2>
      <div className="flex justify-start px-4 py-2 space-x-6">
        <div className="flex-shrink-0 text-xs font-medium text-gray-400">
          Hangs out around
          <IonRouterLink {...zoneRouterProps}>
            <p className="text-sm font-semibold text-primary-500">{zone}</p>
          </IonRouterLink>
        </div>
        {lat && lng && (
          <div className="text-xs font-medium text-gray-400">
            Last spotted at
            <IonRouterLink {...mapRouterProps}>
              <div className="text-sm font-semibold text-primary-500">
                {locationName ? (
                  <p>{locationName}</p>
                ) : (
                  <p className="text-red-500">Error while getting location</p>
                )}
              </div>
            </IonRouterLink>
          </div>
        )}
      </div>

      <div className="px-4 pt-2 rounded-md bg-warmGray-100">
        <p className="text-sm tracking-tight text-justify text-gray-700 whitespace-pre-wrap">
          {description.replaceAll('\n', '\n\n')}
        </p>
        <br />
      </div>
    </section>
  );
};

type CatLocationProps = {
  sightings: CatSighting[] | undefined;
  error: any;
  loading: boolean;
  pageSize: number;
  setPageSize: (
    size: number | ((_size: number) => number),
  ) => Promise<Result<CatSightingsResponse>[] | undefined>;
};

const CatLocation: React.FC<CatLocationProps> = ({
  sightings,
  error,
  loading,
  pageSize,
  setPageSize,
}) => {

  const doLoadMoreSightings = async (event: CustomEvent<void>) => {
    const originalPage = pageSize;
    const data = await setPageSize(originalPage + 1);

    const target = event.target as HTMLIonInfiniteScrollElement;
    setTimeout(() => {
      target.complete();
      if (data && data.length === originalPage) {
        target.disabled = true;
      }
    }, 1000);
  };
  return (
    <div className="w-full h-full">
      {sightings && sightings.length !== 0 ? (
        <div
          className="flex flex-col items-center justify-start w-full px-4 pb-4 space-y-3 overflow-auto h-cat-profile-content"

        >
          {sightings.map((sighting, idx) => (
            <CatLocationCard sighting={sighting} key={idx} />
          ))}

          <IonInfiniteScroll
            threshold="100px"
            onIonInfinite={doLoadMoreSightings}
          >
            <IonInfiniteScrollContent loadingText="Loading more kitty images..."></IonInfiniteScrollContent>
          </IonInfiniteScroll>
        </div>
      ) : (
        <div className="flex justify-center">
          <p className="mt-16 text-xl font-semibold text-gray-700">
            No cat sightings 😿
          </p>
        </div>
      )}
      {error && (
        <div className="flex items-center justify-center w-full h-full">
          <p className="font-medium text-red-600">Error loading sightings</p>
        </div>
      )}
    </div>
  );
};

type CatLocationCardProps = {
  sighting: CatSighting;
};

const CatLocationCard: React.FC<CatLocationCardProps> = ({ sighting }) => {
  const [lat, lng] = sighting.location.coordinates;
  const { ionRouterLinkProps } = usePinLocation(lat, lng, sighting.cat?.name);
  const bgColor =
    sighting.type === SightingType.Emergency
      ? 'bg-red-100'
      : 'bg-secondary-100';

  return (
    <div
      className={`flex items-center justify-start w-full px-2 rounded-md shadow-md ${bgColor} bg-opacity-90`}
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
          <p className="text-base font-medium text-gray-700">Spotted</p>
        ) : (
          <p className="text-base font-medium text-red-700">Emergency!</p>
        )}
        <div className="flex items-center space-x-2">
          <IonIcon color="primary" icon={timeOutline} />
          <p className="text-xs text-gray-800">
            <TimeAgo datetime={sighting.created_at} />
          </p>
        </div>

        <IonRouterLink {...ionRouterLinkProps}>
          <div className="flex items-center mt-1 space-x-2 ">
            <IonIcon color="secondary" icon={locationOutline} />
            <div className="text-xs text-gray-800">
              {sighting.location_name ? (
                <p>{sighting.location_name}</p>
              ) : (
                <p className="text-red-500">
                  Error while getting location name
                </p>
              )}
            </div>
          </div>
        </IonRouterLink>
        <div className="w-full h-full pb-1 m-1 rounded opacity-80 ">
          <p className="text-sm font-medium tracking-tight text-gray-800 line-clamp-2">
            {sighting.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CatDetailPage;
