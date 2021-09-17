import { Point } from 'geojson';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository, SelectQueryBuilder } from 'typeorm';
import {
  Pagination,
  IPaginationOptions,
  paginate,
} from 'nestjs-typeorm-paginate';
import { from, Observable } from 'rxjs';

import { QuerySightingOrderBy } from '@api/sightings';
import { CreateSightingDto } from './dtos/create-sighting.dto';
import { CatSighting } from './catSighting.entity';
import { createGeoJsonPoint } from '../shared/utils/location';
import { QuerySightingDto } from './dtos/query-sighting.dto';

@Injectable()
export class SightingsService {
  constructor(
    @InjectRepository(CatSighting)
    private sightingsRepository: Repository<CatSighting>,
  ) {}

  listSightings(
    queryOptions: Omit<QuerySightingDto, 'page' | 'limit'>,
    pagingOptions: IPaginationOptions,
  ): Observable<Pagination<CatSighting>> {
    console.log(queryOptions, pagingOptions);

    const { catIds, includeUnknownCats, type, ownerIds, orderBy, location } =
      queryOptions;

    console.log(queryOptions);

    let queryBuilder: SelectQueryBuilder<CatSighting> =
      this.sightingsRepository.createQueryBuilder('sighting');

    queryBuilder = type
      ? queryBuilder.andWhere('sighting.type = :type', { type })
      : queryBuilder;

    queryBuilder = ownerIds
      ? queryBuilder.andWhere('sighting.ownerId = ANY(:ownerIds)', { ownerIds })
      : queryBuilder;

    queryBuilder =
      catIds && includeUnknownCats
        ? queryBuilder.andWhere(
            new Brackets((qb) =>
              qb
                .where('sighting.catId = ANY(:catIds)', { catIds })
                .orWhere('sighting.catId is null'),
            ),
          )
        : catIds
        ? queryBuilder.andWhere('sighting.catId = ANY(:catIds)', { catIds })
        : includeUnknownCats == true
        ? queryBuilder.andWhere('sighting.catId is null')
        : includeUnknownCats == false
        ? queryBuilder.andWhere('sighting.catId is not null')
        : queryBuilder;

    const [lat, lng] = location.split(',');
    const origin: Point = createGeoJsonPoint(lat, lng);

    if (orderBy === QuerySightingOrderBy.LOCATION) {
      queryBuilder = queryBuilder
        .orderBy({
          'ST_Distance(sighting.location, ST_GeomFromGeoJSON(:origin))': {
            order: 'ASC',
            nulls: 'NULLS FIRST',
          },
        })
        .setParameters({ origin: JSON.stringify(origin) });
    } else {
      queryBuilder = queryBuilder.orderBy({ 'sighting.created_at': 'ASC' });
    }

    console.log(queryBuilder.getQueryAndParameters());
    return from(
      paginate(queryBuilder, pagingOptions),
      // paginate<CatSighting>(this.sightingsRepository, pagingOptions, query),
    );
  }

  getSighting(id: number): Observable<CatSighting> {
    return from(this.sightingsRepository.findOne(id, { relations: ['cat'] }));
  }

  createSighting(
    createSightingDto: CreateSightingDto,
  ): Observable<CatSighting> {
    const { latlng, ...sightings } = createSightingDto;

    const [lat, lng] = latlng.split(',');
    const location: Point = createGeoJsonPoint(lat, lng);

    const sighting = this.sightingsRepository.create({
      ...sightings,
      location,
    });
    return from(this.sightingsRepository.save(sighting));
  }
}
