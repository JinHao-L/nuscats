import { UpdateSightingDto } from './dtos/update-sighting.dto';
import {
  Body,
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
  UseGuards,
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
import { CatSighting } from './sighting.entity';
import { SightingsService } from './sightings.service';
import { CreateSightingDto } from './dtos/create-sighting.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { MultipleSightingQuery } from './dtos/multiple-sighting.dto';
import * as QueryString from 'query-string';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { User } from 'src/users/user.entity';
import { Usr } from 'src/shared/decorators/user.decorator';
import { PaginatedSightings } from './dtos/paginated-sighting.dto';

@ApiTags('Sightings')
@Controller('sightings')
export class SightingsController {
  constructor(private sightingsService: SightingsService) {}

  /**
   * Gets all sightings (based on query result)
   */
  @ApiOkResponse({
    description: 'Successfully get list of sightings',
    type: PaginatedSightings,
  })
  @ApiQuery({ name: 'catIds', required: false, explode: false })
  @ApiQuery({ name: 'ownerIds', required: false, explode: false })
  @Get()
  listMultipleSightings(
    @Req() request: Request,
    @Query() sightingQuery: MultipleSightingQuery,
  ): Observable<Pagination<CatSighting>> {
    const { limit, page, ...queryOptions } = sightingQuery;

    return this.sightingsService.listBy(queryOptions, {
      limit: Math.min(50, limit),
      page,
      route: QueryString.exclude(request.originalUrl, ['page', 'limit']),
    });
  }

  /**
   * Gets the latest sighting for each cat
   */
  @ApiOkResponse({
    description: 'Successfully get list of sightings',
    type: [CatSighting],
  })
  @Get('/latest')
  getLatest(): Observable<CatSighting[]> {
    return this.sightingsService.listLatest();
  }

  /**
   * Obtains the list of cat sightings that require admins to be alerted about.
   * This includes new cat sightings for neutering as well as emergency reports.
   *
   * @returns list of cat sightings that require admins to be alerted about
   */
  @Get('/alert')
  getAlerts(): Observable<CatSighting[]> {
    return this.sightingsService.listAlerts();
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
  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  updateSighting(
    @Usr() requester: User,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSightingDto: UpdateSightingDto,
  ) {
    return this.sightingsService.update(id, updateSightingDto, requester);
  }

  /**
   * Removes a cat sighting
   */
  @ApiOkResponse({
    description: 'Successfully deleted requested profile',
    type: CatSighting,
  })
  @ApiParam({ name: 'id', description: 'The id of the sighting to remove' })
  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  removeSighting(
    @Usr() requester: User,
    @Param('id', ParseIntPipe) id: number,
  ): Observable<CatSighting> {
    return this.sightingsService.remove(id, requester);
  }
}
