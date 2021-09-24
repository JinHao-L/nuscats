import { CatSighting } from './../sighting.entity';
import { CatSightingsResponse } from '@api/sightings';
import { ApiProperty } from '@nestjs/swagger';

export class PaginatedSightings implements CatSightingsResponse {
  @ApiProperty({ type: [CatSighting] })
  items: CatSighting[];

  @ApiProperty()
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };

  @ApiProperty()
  links: {
    first: string;
    previous: string;
    next: string;
    last: string;
  };
}
