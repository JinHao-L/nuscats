export enum UniversityZone {
  Computing = "Computing",
  Arts = "Arts",
  Engineering = "Engineering",
  Utown = "Utown",
}

export interface Cat {
  id: number;
  name: string;
  neutered: boolean;
  one_liner: string;
  description: string;
  zone: UniversityZone;
  created_at: Date;
  updated_at: Date;
}
