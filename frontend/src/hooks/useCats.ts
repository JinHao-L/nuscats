import { Cat } from "@api/cats";
import { catsKey, swrFetcher } from "lib/api";
import useSWR from "swr";

export function useCats() {
    const { data, error, mutate } = useSWR(catsKey, swrFetcher<Cat[]>(), { dedupingInterval: 10000 })

    const isLoading = !data && !error
    const err = (data && !data.success) ? new Error(`status code: ${data?.status}`) : error

    return {
        cats: data?.value,
        error: err,
        isLoading,
        mutate,
    }
}

type useCatOptions = {
    includeSightings?: boolean
}

export function useCat(id: number, { includeSightings }: useCatOptions = {}) {
    const { data, error, mutate } = useSWR(!isNaN(id) ? `${catsKey}/${id}` : null, swrFetcher<Cat>())
    // const {
    //     data: sightingsData,
    //     error: sightingsError,
    //     mutate: mutateSightings
    // } = useSWR(``)

    const isLoading = !data && !error
    const err = (data && !data.success) ? new Error(`status code: ${data?.status}`) : error
    const notFound = (data && data.status === 404)

    return {
        cat: err ? undefined : data?.value,
        error: err,
        notFound,
        isLoading,
        mutate,
    }
}