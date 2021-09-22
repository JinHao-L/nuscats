import { MouseEventHandler } from "react"

export interface ImageDetail {
    src: string
    altText: string
}

export type ImageClickHandler = (detail: ImageDetail, idx: number) => MouseEventHandler<HTMLImageElement>

interface ImageGalleryProps {
    details: ImageDetail[]
    imageClickHandler?: ImageClickHandler
    withoutBorder?: boolean
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({ details, imageClickHandler: handler, withoutBorder }) => {
    return <div className={`w-full h-full grid grid-cols-3 gap-0.5 px-0.5 py-0.5 overflow-y-auto ${!withoutBorder ? "border-gray-400 border-t" : ""}`}>
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
