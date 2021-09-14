import {
  IsEnum,
  IsInt,
  IsLatLong,
  IsNotEmpty,
  IsOptional,
  IsUrl,
} from 'class-validator';

import { SightingType } from '@api/sightings';

export class CreateSightingDto {
  /**
   * The image of the sighting
   */
  @IsUrl()
  @IsNotEmpty()
  image: string;

  /**
   * The cat id
   */
  @IsInt()
  @IsOptional()
  cat?: number;

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
}
