import useReverseGeocoding from "hooks/useReverseGeocoding"

interface ReverseGeocodingProps {
    lat: number
    long: number
}

export const ReverseGeocoding: React.FC<ReverseGeocodingProps> = ({ lat, long }) => {
    const { data, error, firstResult } = useReverseGeocoding(lat, long)
    return (
        <>
            {data &&
                <p>
                    {firstResult()?.name}
                </p>
            }
            {error &&
                <p className="text-red-500">
                    Error while getting location
                </p>
            }

        </>
    )
}
