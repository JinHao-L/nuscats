import { PositionStackApiKey } from "lib/config";
import { ReverseGeocodingResponse, ReverseGeocodingResult } from "lib/geocoding";
import useSWRImmutable from "swr/immutable";

const constructReverseGeocodingQueryUrl = (key: string, lat: number, long: number) => {
    return `http://api.positionstack.com/v1/reverse?access_key=${key}&query=${lat},${long}`
}

export default function useReverseGeocoding(lat: number, long: number) {
    const key = PositionStackApiKey
    if (!key) {
        console.log("REACT_APP_POSITIONSTACK_API_KEY env variable not set")
    }
    const { data, error } = useSWRImmutable(
        key ? `${constructReverseGeocodingQueryUrl(key, lat, long)}` : null,
        key => fetch(key).then(async res => await res.json() as ReverseGeocodingResponse)
    )

    return {
        data: data,
        error,
        firstResult(): ReverseGeocodingResult | undefined {
            if (data && data.data.length > 0) {
                return data.data[0]
            }
            return undefined
        }
    }
}