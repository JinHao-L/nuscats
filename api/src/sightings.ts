import { Point } from "geojson";
import { Cat } from "./cats";

export enum SightingType {
  Emergency = "Emergency",
  CatSighted = "CatSighted",
}

export class CatSighting {
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
