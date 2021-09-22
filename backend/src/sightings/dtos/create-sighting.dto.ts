import {
  IsEnum,
  IsInt,
  IsLatLong,
  IsNotEmpty,
  IsOptional,
  IsUrl,
  IsUUID,
} from 'class-validator';

import { CreateSightingRequest, SightingType } from '@api/sightings';

export class CreateSightingDto implements CreateSightingRequest {
  /**
   * The image of the sighting
   */
  @IsUrl({ require_tld: false })
  @IsNotEmpty()
  image: string;

  /**
   * The cat id
   */
  @IsInt()
  @IsOptional()
  catId?: number;

  /**
   * The (lat, lng) location of the sighting
   * @example '85.3446311,85.2100893'
   */
  @IsLatLong()
  latlng: string;

  /**
   * The type of sighting
   */
  @IsEnum(SightingType)
  type: SightingType;

  /**
   * The description of the sighting
   */
  @IsNotEmpty()
  description: string;

  /**
   * The uuid of the user who is uploading the sighting
   */
  @IsUUID()
  ownerId: string;
}
