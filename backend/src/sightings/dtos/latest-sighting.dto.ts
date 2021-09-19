import { Transform } from 'class-transformer';
import { IsArray, IsInt, IsOptional, IsPositive } from 'class-validator';

export class LatestSightingQuery {
  //================ FILTERS ===================

  /**
   * The ids of cats to query
   */
  @IsOptional()
  @IsArray()
  @Transform(({ value }) => value?.split(',')?.map((item) => Number(item)))
  @IsInt({ each: true })
  @IsPositive({ each: true })
  @IsOptional()
  catIds?: number[];

  // /**
  //  * The ids of cats to query
  //  */
  // @Transform(({ value }) => value == 'true')
  // @IsBoolean()
  // showCats?: boolean = false;
}
