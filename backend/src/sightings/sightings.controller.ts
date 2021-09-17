import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { catchError, EMPTY, mergeMap, Observable } from 'rxjs';
import { Request } from 'express';
import { CatSighting } from './catSighting.entity';
import { SightingsService } from './sightings.service';
import { CreateSightingDto } from './dtos/create-sighting.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { QuerySightingDto } from './dtos/query-sighting.dto';

@ApiTags('Sightings')
@Controller('sightings')
export class SightingsController {
  constructor(private sightingsService: SightingsService) {}

  /**
   * Get all sightings (based on query result)
   */
  @ApiOkResponse({
    description: 'Successfully get list of sightings',
    type: [CatSighting],
  })
  @ApiQuery({
    name: 'catIds',
    required: false,
    explode: false,
  })
  @ApiQuery({
    name: 'ownerIds',
    required: false,
    explode: false,
  })
  @Get()
  listAllSightings(
    @Req() request: Request,
    @Query() querySightingDto: QuerySightingDto,
  ): Observable<Pagination<CatSighting>> {
    console.log(querySightingDto);
    const { limit, page, ...queryOptions } = querySightingDto;

    return this.sightingsService.listSightings(queryOptions, {
      limit: Math.min(50, limit),
      page,
      route: '/sightings',
    });
  }

  /**
   * Get a cat sighting by post id
   */
  @ApiOkResponse({
    description: 'Successfully get list of sightings',
    type: [CatSighting],
  })
  @ApiParam({ name: 'id', description: 'The id of the sighting to query' })
  @Get('/:id')
  getSighting(@Param('id', ParseIntPipe) id: number): Observable<CatSighting> {
    return this.sightingsService.getSighting(id).pipe(
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
   * Create a new cat sighting
   */
  @ApiCreatedResponse({
    description: 'Successfully created new sighting',
    type: CatSighting,
  })
  @Post()
  createSighting(
    @Body() createSightingDto: CreateSightingDto,
  ): Observable<CatSighting> {
    return this.sightingsService.createSighting(createSightingDto);
  }

  /**
   * Update a cat sighting
   */
  @ApiOkResponse({
    description: 'Successfully updated sighting',
    type: CatSighting,
  })
  @ApiParam({ name: 'id', description: 'The id of the sighting to update' })
  @Put('/:id')
  updateSighting() {
    // TODO, what can users update?
    return;
  }
}
