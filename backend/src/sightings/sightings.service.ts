import { UpdateSightingDto } from './dtos/update-sighting.dto';
import { Point } from 'geojson';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository, SelectQueryBuilder } from 'typeorm';
import {
  Pagination,
  IPaginationOptions,
  paginate,
} from 'nestjs-typeorm-paginate';
import { from, mergeMap, Observable } from 'rxjs';

import { QuerySightingOrderBy } from '@api/sightings';
import { CreateSightingDto } from './dtos/create-sighting.dto';
import { CatSighting } from './catSighting.entity';
import { createGeoJsonPoint } from '../shared/utils/location';
import { MultipleSightingQuery } from './dtos/multiple-sighting.dto';

@Injectable()
export class SightingsService {
  constructor(
    @InjectRepository(CatSighting)
    private sightingsRepository: Repository<CatSighting>,
  ) {}

  listBy(
    queryOptions: Omit<MultipleSightingQuery, 'page' | 'limit'>,
    pagingOptions: IPaginationOptions,
  ): Observable<Pagination<CatSighting>> {
    const { catIds, includeUnknownCats, type, ownerIds, orderBy, location } =
      queryOptions;

    let queryBuilder: SelectQueryBuilder<CatSighting> =
      this.sightingsRepository.createQueryBuilder('sighting');

    queryBuilder = type
      ? queryBuilder.andWhere('sighting.type = :type', { type })
      : queryBuilder;

    queryBuilder = ownerIds
      ? queryBuilder.andWhere('sighting.owner_id = ANY(:ownerIds)', {
          ownerIds,
        })
      : queryBuilder;

    queryBuilder =
      catIds && includeUnknownCats
        ? queryBuilder.andWhere(
            new Brackets((qb) =>
              qb
                .where('sighting.cat_id = ANY(:catIds)', { catIds })
                .orWhere('sighting.cat_id is null'),
            ),
          )
        : catIds
        ? queryBuilder.andWhere('sighting.cat_id = ANY(:catIds)', { catIds })
        : includeUnknownCats == true
        ? queryBuilder.andWhere('sighting.cat_id is null')
        : includeUnknownCats == false
        ? queryBuilder.andWhere('sighting.cat_id is not null')
        : queryBuilder;

    if (orderBy === QuerySightingOrderBy.LOCATION && location) {
      const [lat, lng] = location.split(',');
      const origin: Point = createGeoJsonPoint(lat, lng);

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

    return from(paginate(queryBuilder, pagingOptions));
  }

  listLatest(catIds?: number[]): Observable<CatSighting[]> {
    /**
     * select distinct on ("cat_id") *
     * from "cat_sighting"
     * where "cat_id" is not null
     * order by "cat_id", created_at
     */

    const queryBuilder: SelectQueryBuilder<CatSighting> =
      this.sightingsRepository
        .createQueryBuilder('sighting')
        .leftJoinAndSelect('sighting.cat', 'cat')
        .distinctOn(['sighting.cat_id'])
        .where(
          catIds
            ? 'sighting.cat_id = ANY(:catIds)'
            : 'sighting.cat_id is not null',
          { catIds },
        )
        .orderBy('sighting.cat_id')
        .addOrderBy('sighting.created_at');
    return from(queryBuilder.getMany());
  }

  findOne(id: number): Observable<CatSighting> {
    return from(this.sightingsRepository.findOne(id, { relations: ['cat'] }));
  }

  create(createSightingDto: CreateSightingDto): Observable<CatSighting> {
    const { latlng, catId, ...sightings } = createSightingDto;

    const [lat, lng] = latlng.split(',');
    const location: Point = createGeoJsonPoint(lat, lng);

    const sighting = this.sightingsRepository.create({
      ...sightings,
      cat_id: catId,
      location,
    });
    return from(this.sightingsRepository.save(sighting));
  }

  update(
    id: number,
    updateSightingDto: UpdateSightingDto,
  ): Observable<CatSighting> {
    return from(
      this.sightingsRepository.update({ id }, { ...updateSightingDto }),
    ).pipe(mergeMap(() => this.findOne(id)));
  }

  remove(id: number): Observable<CatSighting> {
    return this.findOne(id).pipe(
      mergeMap((post) => this.sightingsRepository.remove(post)),
    );
  }
}
