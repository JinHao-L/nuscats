import { sightingsKey } from './../lib/api';
import {
  CatSightingQuery,
  CatSightingsResponse,
  CatSighting,
} from '@api/sightings';
import { latestKey, Result, swrFetcher } from 'lib/api';
import useSWR from 'swr';
import useSWRInfinite from 'swr/infinite';
import * as queryString from 'query-string';
import { parseDate } from 'lib/utils';

export interface UseSightingsOptions extends CatSightingQuery { }

export function useSightings(useSightingsOptions?: UseSightingsOptions) {
  // build sightings key
  const query = useSightingsOptions
    ? queryString.stringify(useSightingsOptions)
    : '';

  const getKey = (
    _pageIndex: number,
    previousPageData: Result<CatSightingsResponse> | null,
  ) => {
    if (!previousPageData) {
      return sightingsKey + '?' + query;
    }
    if (previousPageData && previousPageData.value?.links?.next === '') {
      // reached the end
      return null;
    }
    return previousPageData?.value.links?.next;
  };

  const { data, error, isValidating, mutate, size, setSize } = useSWRInfinite(
    getKey,
    swrFetcher<CatSightingsResponse>(),
    { dedupingInterval: 10000 },
  );

  const sightings = data
    ?.filter((res) => res.success)
    .flatMap((res) =>
      res.value.items.map((item) => {
        item.created_at = parseDate(item.created_at);
        item.updated_at = parseDate(item.updated_at);
        return item;
      }),
    );

  return {
    sightings,
    error,
    mutate,
    isLoading: isValidating,
    pageSize: size,
    setPageSize: setSize,
  };
}

export function useLatestSightings() {
  const { data, error, mutate } = useSWR(
    latestKey,
    swrFetcher<CatSighting[]>(),
    { dedupingInterval: 10000 },
  );

  const isLoading = !data && !error;
  const err =
    data && !data.success ? new Error(`status code: ${data?.status}`) : error;

  const sightings = err
    ? undefined
    : data?.value.map((item) => {
      item.created_at = parseDate(item.created_at);
      item.updated_at = parseDate(item.updated_at);
      return item;
    });

  return { sightings, error: err, isLoading, mutate };
}
