// Interface derived from
// https://positionstack.com/documentation

export interface ReverseGeocodingResponse {
  data: ReverseGeocodingResult[];
}

export interface ReverseGeocodingResult {
  latitude: number;
  longitude: number;
  type: string;
  distance: number;
  name: string;
  number: null | string;
  postal_code: null;
  street: null | string;
  confidence: number;
  region: string;
  region_code: string;
  county: null;
  locality: string;
  administrative_area: null;
  neighbourhood: null;
  country: string;
  country_code: string;
  continent: string;
  label: string;
}
