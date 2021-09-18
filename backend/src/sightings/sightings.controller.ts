import { UpdateSightingDto } from './dtos/update-sighting.dto';
import {
  Body,
  CacheInterceptor,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { catchError, EMPTY, map, mergeMap, Observable } from 'rxjs';
import { Request } from 'express';
import { CatSighting } from './catSighting.entity';
import { SightingsService } from './sightings.service';
import { CreateSightingDto } from './dtos/create-sighting.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { MultipleSightingQuery } from './dtos/multiple-sighting.dto';
import { LatestSightingQuery } from './dtos/latest-sighting.dto';

@ApiTags('Sightings')
@UseInterceptors(CacheInterceptor)
@Controller('sightings')
export class SightingsController {
  constructor(private sightingsService: SightingsService) {}

  /**
   * Gets the latest sighting for each cat
   */
  @ApiOkResponse({
    description: 'Successfully get list of sightings',
    type: [CatSighting],
  })
  @ApiQuery({ name: 'catIds', required: false, explode: false })
  @Get('/latest')
  getLatest(
    @Query() sightingQuery: LatestSightingQuery,
  ): Observable<CatSighting[]> {
    console.log(sightingQuery);
    return this.sightingsService.listLatest(sightingQuery.catIds);
  }

  /**
   * Gets a cat sighting by post id
   */
  @ApiOkResponse({
    description: 'Successfully get list of sightings',
    type: [CatSighting],
  })
  @ApiParam({ name: 'id', description: 'The id of the sighting to query' })
  @Get('/:id')
  getSighting(@Param('id', ParseIntPipe) id: number): Observable<CatSighting> {
    return this.sightingsService.findOne(id).pipe(
      catchError(() => EMPTY),
      mergeMap(async (val) => {
        if (val) {
          return val;
        } else {
          throw new NotFoundException('Sighting not found');
        }
      }),
    );
  }

  /**
   * Gets all sightings (based on query result)
   */
  @ApiOkResponse({
    description: 'Successfully get list of sightings',
    type: [CatSighting],
  })
  @ApiQuery({ name: 'catIds', required: false, explode: false })
  @ApiQuery({ name: 'ownerIds', required: false, explode: false })
  @Get()
  listAllSightings(
    @Req() request: Request,
    @Query() sightingQuery: MultipleSightingQuery,
  ): Observable<Pagination<CatSighting>> {
    console.log(sightingQuery);
    const { limit, page, ...queryOptions } = sightingQuery;

    return this.sightingsService.listBy(queryOptions, {
      limit: Math.min(50, limit),
      page,
      route: request.path,
    });
  }

  /**
   * Creates a new cat sighting
   */
  @ApiCreatedResponse({
    description: 'Successfully created new sighting',
    type: CatSighting,
  })
  @Post()
  createSighting(
    @Body() createSightingDto: CreateSightingDto,
  ): Observable<CatSighting> {
    return this.sightingsService.create(createSightingDto);
  }

  /**
   * Updates a cat sighting
   */
  @ApiOkResponse({
    description: 'Successfully updated sighting',
    type: CatSighting,
  })
  @ApiParam({ name: 'id', description: 'The id of the sighting to update' })
  @Put('/:id')
  updateSighting(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSighintDto: UpdateSightingDto,
  ) {
    return this.sightingsService.update(id, updateSighintDto);
  }

  /**
   * Removes a cat sighting
   */
  @ApiOkResponse({
    description: 'Successfully deleted requested profile',
    type: CatSighting,
  })
  @ApiParam({ name: 'id', description: 'The id of the sighting to remove' })
  @Delete('/:id')
  removeSighting(@Param('id', ParseIntPipe) id: number): Observable<string> {
    return this.sightingsService
      .remove(id)
      .pipe(map(() => 'Deleted successfully'));
  }
}
