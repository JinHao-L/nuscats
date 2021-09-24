import { alertSightingsKey, sightingsKey } from './../lib/api';
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

export type UseSightingsOptions = Omit<CatSightingQuery, "page" | "limit">

export function useSightings(
  useSightingsOptions?: UseSightingsOptions,
  pageInfo?: { page: number, limit: number },
) {

  const { page: initialPage, limit: initialLimit } = pageInfo ?? {}

  // build sightings key
  const makeQuery = (params?: { page: number, limit: number }) => {
    if (!useSightingsOptions) {
      return '';
    }

    if (!params) {
      return queryString.stringify(useSightingsOptions)
    }

    const { page, limit } = params
    return queryString.stringify({ ...useSightingsOptions, page, limit })
  }

  const getKey = (
    pageIndex: number,
    previousPageData: Result<CatSightingsResponse> | null,
  ) => {
    if (!previousPageData) {
      return sightingsKey + '?' + makeQuery({ page: initialPage ?? pageIndex + 1, limit: initialLimit ?? 10 });
    }
    if (previousPageData && previousPageData.value?.links?.next === '') {
      // reached the end
      return null;
    }

    return `${sightingsKey}?${makeQuery({ page: pageIndex + 1, limit: initialLimit ?? 10 })}`
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

export function useAlertSightings() {
  const { data, error, mutate } = useSWR(
    alertSightingsKey,
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

export function useSingleSighting(id: CatSighting['id']) {
  const { data, error, mutate } = useSWR(
    `${sightingsKey}/${id}`,
    swrFetcher<CatSighting>(),
    { dedupingInterval: 10000 },
  );

  const isLoading = !data && !error;

  const err =
    data && !data.success ? new Error(`status code: ${data?.status}`) : error;

  return { sighting: data?.value, error: err, isLoading, mutate };
}
