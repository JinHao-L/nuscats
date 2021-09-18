import { Transform } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsLatLong,
  IsOptional,
  IsPositive,
  IsUUID,
} from 'class-validator';
import {
  CatSightingQuery as ICatSightingQuery,
  QuerySightingOrderBy,
  SightingType,
} from '@api/sightings';

export class QuerySightingDto implements ICatSightingQuery {
  //================ FILTERS ===================

  /**
   * The ids of cats to query
   */
  @IsOptional()
  @IsArray({})
  @Transform(({ value }) => value.split(',').map((item) => Number(item)))
  @IsInt({ each: true })
  @IsPositive({ each: true })
  catIds?: number[];

  /**
   * Whether unknown cats should be shown
   */
  @IsOptional()
  @Transform(({ value }) => value == 'true')
  @IsBoolean()
  includeUnknownCats?: boolean;

  /**
   * The type of sightings to query
   */
  @IsOptional()
  @IsEnum(SightingType)
  type?: SightingType;

  /**
   * The ids of the sighting owner to query
   *
   * Expect a uuid array
   */
  @IsOptional()
  @IsArray({})
  @Transform(({ value }) => value.split(','))
  @IsUUID(4, { each: true })
  ownerIds?: string[];

  //================ ORDERING ===================

  /**
   * The ordering type of the query
   *
   * Note: ordering by location defaults to time if location is not provided
   *
   * @default QuerySightingOrderBy.TIME
   */
  @IsOptional()
  @IsEnum(QuerySightingOrderBy)
  orderBy?: QuerySightingOrderBy = QuerySightingOrderBy.TIME;

  /**
   * The (lat, lng) location of the user
   * @example '85.3446311,85.2100893'
   */
  @IsOptional()
  @IsLatLong()
  location?: string;

  //================ PAGINATION ===================

  /**
   * The number of queries per page
   */
  limit?: number = 10;

  /**
   * The page number to query
   */
  page?: number = 1;
}
