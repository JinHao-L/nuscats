import {
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonSpinner,
} from '@ionic/react';
import { useMemo } from 'react';
import { ImageDetail, ImageClickHandler, ImageGallery } from './ImageGallery';

interface InfiniteImageGalleryProps {
  details: ImageDetail[] | undefined;
  imageClickHandler?: ImageClickHandler;
  withoutBorder?: boolean;

  isLoading?: boolean;
  loadingText: string;
  renderEmpty: () => React.ReactNode;

  galleryClassName?: string;
  infiniteScrollThreshold?: string;

  pageSize: number;
  setPageSize: (
    size: number | ((_size: number) => number),
  ) => Promise<any[] | undefined>;
}

export const InfiniteImageGallery: React.FC<InfiniteImageGalleryProps> = ({
  details,
  imageClickHandler,
  withoutBorder,
  infiniteScrollThreshold,
  isLoading,
  loadingText,
  renderEmpty,
  galleryClassName,
  pageSize,
  setPageSize,
}) => {
  const doLoadMore = async (event: CustomEvent<void>) => {
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

  const galleryDisplay = useMemo(() => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center w-full h-full">
          <IonSpinner />
        </div>
      );
    } else if (details && details.length > 0) {
      return (
        <ImageGallery
          details={details}
          withoutBorder={withoutBorder}
          imageClickHandler={imageClickHandler}
        />
      );
    } else {
      return renderEmpty();
    }
  }, [isLoading, details, withoutBorder, imageClickHandler, renderEmpty]);

  return (
    <>
      <div className={galleryClassName}>{galleryDisplay}</div>
      <IonInfiniteScroll
        threshold={infiniteScrollThreshold}
        onIonInfinite={doLoadMore}
      >
        <IonInfiniteScrollContent
          loadingText={loadingText}
        ></IonInfiniteScrollContent>
      </IonInfiniteScroll>
    </>
  );
};
