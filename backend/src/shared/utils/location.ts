import { Point } from 'geojson';

export function createGeoJsonPoint(lat: string, lng: string): Point {
  return {
    type: 'Point',
    coordinates: [lat, lng].map(parseFloat),
  };
}
