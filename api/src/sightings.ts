import { Point } from "geojson";
import { Cat } from "./cats";

export enum SightingType {
  Emergency = "Emergency",
  CatSighted = "CatSighted",
}

export interface CatSighting {
  id: number;
  image: string; // url to image
  catId?: number; // id reference to cat
  cat?: Cat;
  location: Point;
  type: SightingType;
  description: string;
  created_at: Date;
  updated_at: Date;
}

export function makeSighting(
  {
    id,
    image,
    catId = 0,
    cat = undefined,
    location,
    type,
    description = ""
  }: {
    id: number,
    image: string,
    catId?: number,
    cat?: Cat | undefined,
    location: Point
    type: SightingType,
    description?: string,
  }): CatSighting {

  return {
    id: id,
    image: image,
    catId: catId,
    cat: cat,
    location: location,
    type: type,
    description: description,
    created_at: new Date(),
    updated_at: new Date(),
  }
}