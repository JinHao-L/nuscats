import { Point } from "geojson";
import { Profile } from "./profiles";
import { Cat } from "./cats";

export enum SightingType {
  Emergency = "Emergency",
  CatSighted = "CatSighted",
}

export interface CatSighting {
  id: number;
  image: string; // url to image
  cat_id?: number; // id reference to cat
  cat?: Cat; // when viewing a particular sighting information
  location: Point;
  location_name: string;
  type: SightingType;
  description: string;
  owner_id?: string;
  owner?: Profile;
  created_at: Date;
  updated_at: Date;
}

export function makeSighting({
  id,
  image,
  cat_id = 0,
  cat = undefined,
  location,
  location_name,
  type,
  description = "",
}: {
  id: number;
  image: string;
  cat_id?: number;
  cat?: Cat | undefined;
  location: Point;
  location_name: string;
  type: SightingType;
  description?: string;
}): CatSighting {
  return {
    id: id,
    image: image,
    cat_id: cat_id,
    cat: cat,
    location: location,
    location_name: location_name,
    type: type,
    description: description,
    created_at: new Date(),
    updated_at: new Date(),
  };
}

export enum QuerySightingOrderBy {
  TIME = "time",
  LOCATION = "location",
}

export interface CatSightingQuery {
  //================ DATA TYPE ===================
  includeCatsData?: boolean;
  includeOwnerData?: boolean;

  //================ FILTERS ===================
  catIds?: number[];
  includeUnknownCats?: boolean;
  type?: SightingType;
  ownerIds?: string[];

  //================ ORDERING ===================
  orderBy?: QuerySightingOrderBy;
  location?: string;

  //================ PAGINATION ===================
  limit?: number;
  page?: number;
}

export interface CatSightingsResponse {
  items: CatSighting[];
  meta: PaginationMetadata;
  links: Links;
}

export interface Links {
  first: string;
  previous: string;
  next: string;
  last: string;
}

export interface PaginationMetadata {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

export interface CreateSightingRequest {
  /**
   * The image of the sighting
   */
  image: string;

  /**
   * The cat id
   */
  catId?: number;

  /**
   * The (lat, lng) location of the sighting
   * @example '85.3446311,85.2100893'
   */
  latlng: string;

  /**
   * The type of sighting
   */
  type: SightingType;

  /**
   * The description of the sighting
   */
  description: string;
}
