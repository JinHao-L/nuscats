export enum UniversityZone {
  Computing = "Computing",
  Arts = "Arts",
  Engineering = "Engineering",
  Utown = "Utown",
  Science = "Science",
}

// Map zones to [lng,lat]
export const ZoneLocation = {
  [UniversityZone.Computing]: [1.294896602, 103.7739567],
  [UniversityZone.Arts]: [1.294458488, 103.7711744],
  [UniversityZone.Engineering]: [1.300385691, 103.7712593],
  [UniversityZone.Utown]: [1.306292732, 103.7728598],
  [UniversityZone.Science]: [1.296729166, 103.7803005],
};

export interface Cat {
  id: number;
  name: string;
  image: string;
  neutered: boolean;
  one_liner: string;
  description: string;
  zone: UniversityZone;
  created_at: Date;
  updated_at: Date;
}

export function makeCat({
  id,
  name,
  image = "",
  neutered = false,
  one_liner = "",
  description = "",
  zone,
}: {
  id: number;
  name: string;
  image?: string;
  neutered?: boolean;
  one_liner?: string;
  description?: string;
  zone: UniversityZone;
}): Cat {
  return {
    id: id,
    name: name,
    image: image,
    neutered: neutered,
    one_liner: one_liner,
    description: description,
    zone: zone,
    created_at: new Date(),
    updated_at: new Date(),
  };
}
