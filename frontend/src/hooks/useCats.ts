import { Cat } from "@api/cats";
import { QuerySightingOrderBy, CatSightingsResponse } from "@api/sightings"
import { catsKey, Result, sightingsKey, swrFetcher } from "lib/api";
import useSWR from "swr";
import useSWRInfinite from "swr/infinite";

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

function getSightingsKeyForCat(catId: number) {
    return (idx: number, previousPageData: Result<CatSightingsResponse> | null) => {
        if (previousPageData && previousPageData.value.links.next === "") {
            return null // reached the end
        }

        return `${sightingsKey}?catIds=${catId}&orderBy=${QuerySightingOrderBy.TIME}&page=${idx + 1}&limit=10`
    }
}

type useCatOptions = {
    includeSightings?: boolean
}

export function useCat(id: number, { includeSightings }: useCatOptions = {}) {
    const { data, error, mutate, isValidating } = useSWR(!isNaN(id) ? `${catsKey}/${id}` : null, swrFetcher<Cat>())

    const err = (data && !data.success) ? new Error(`status code: ${data?.status}`) : error
    const notFound = (data && data.status === 404)
    const cat = err ? undefined : data?.value

    const {
        data: sightingsData,
        error: sightingsError,
        size,
        setSize,
        isValidating: sightingsValidating,
    } = useSWRInfinite(
        cat && includeSightings ? getSightingsKeyForCat(id) : null,
        swrFetcher<CatSightingsResponse>(),
    )

    // const sightingsLoading = !sightingsData && !sightingsError
    const catSightings = sightingsData
        ?.filter(res => res.success)
        .flatMap(res => res.value.items.map(item => {
            // hacky workaround: interface type is a Date, but the actual runtime
            // type is a string
            item.created_at = fixDate(item.created_at)
            item.updated_at = fixDate(item.updated_at)
            return item
        }))

    return {
        cat,
        error: err,
        catLoading: isValidating,
        notFound,
        mutate,
        catSightings,
        sightingsError,
        sightingsLoading: sightingsValidating,
        sightingsPageSize: size,
        setSightingsPageSize: setSize
    }
}

const fixDate = (date: Date): Date => {
    const strDate = date as unknown as string
    return new Date(strDate)
}