import { IonItem, useIonPopover } from "@ionic/react"
import { MouseEventHandler, useState } from "react"

export interface ImageDetail {
    src: string
    altText: string
}

export type ImageClickHandler = (detail: ImageDetail, idx: number) => MouseEventHandler<HTMLImageElement>

interface ImageGalleryProps {
    details: ImageDetail[]
    imageClickHandler?: ImageClickHandler
    imagePopupOnClick?: boolean
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({ details, imageClickHandler: handler, imagePopupOnClick }) => {


    return <div className="w-full h-full grid grid-cols-3 gap-0.5 px-0.5 py-0.5 border-t border-gray-400 overflow-y-auto md:grid-cols-4 lg:grid-cols-5">
        {details.map((detail, idx) => {
            return <div key={idx} className="aspect-w-1 aspect-h-1">
                <img
                    className="object-cover"
                    alt={detail.altText}
                    src={detail.src}
                    onClick={handler ? handler(detail, idx) : undefined}
                />
            </div>
        })}
    </div>
}

const ImagePopup: React.FC<ImageDetail> = ({ src, altText }) => {
    return (
        <IonItem>
            <img src={src} alt={altText} />
        </IonItem>
    )
}