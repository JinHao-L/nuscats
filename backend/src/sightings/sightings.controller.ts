import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { catchError, EMPTY, mergeMap, Observable } from 'rxjs';
import { CatSighting } from './catSighting.entity';
import { SightingsService } from './sightings.service';
import { CreateSightingDto } from './dtos/create-sighting.dto';

@ApiTags('Sightings')
@Controller('sightings')
export class SightingsController {
  constructor(private sightingsService: SightingsService) {}

  /**
   * Get all sightings
   */
  @ApiOkResponse({
    description: 'Successfully get list of sightings',
    type: [CatSighting],
  })
  @Get()
  listAllSightings(): Observable<CatSighting[]> {
    return this.sightingsService.listAllSightings();
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
