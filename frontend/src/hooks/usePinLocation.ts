import { useMemo } from 'react';
import { MAP_ROUTE } from 'app/routes';
import * as QueryString from 'query-string';

const usePinLocation = (lat: number, lng: number, tag?: string) => {
  const url = useMemo(() => {
    const query = QueryString.stringify({ lat, lng, tag });
    return `${MAP_ROUTE}?${query}`;
  }, [lat, lng, tag]);

  const ionRouterLinkProps: {
    routerLink: string;
    routerDirection?: 'none' | 'forward' | 'back' | 'root';
    routerOptions?: { unmount: boolean };
  } = useMemo(
    () => ({
      routerLink: url,
      routerDirection: 'root',
      routerOptions: { unmount: true },
    }),
    [url],
  );
  return { url, ionRouterLinkProps };
};

export default usePinLocation;
