import { CatSighting } from "./sightings";

export enum UniversityZone {
  Computing = "Computing",
  Arts = "Arts",
  Engineering = "Engineering",
  Utown = "Utown",
  Science = "Science",
}

export interface Cat {
  id: number;
  name: string;
  neutered: boolean;
  one_liner: string;
  description: string;
  zone: UniversityZone;
  sightings?: CatSighting[];
  created_at: Date;
  updated_at: Date;
}
