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

export function makeCat({
    id,
    name,
    neutered = false,
    one_liner = '',
    description = '',
    zone,
}: {
    id: number;
    name: string;
    neutered?: boolean;
    one_liner?: string;
    description?: string;
    zone: UniversityZone;
}): Cat {

    return {
        id: id,
        name: name,
        neutered: neutered,
        one_liner: one_liner,
        description: description,
        zone: zone,
        created_at: new Date(),
        updated_at: new Date()
    }
}