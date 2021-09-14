import { Point } from 'geojson';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CatSighting } from './catSighting.entity';
import { Repository } from 'typeorm';
import { from, Observable } from 'rxjs';
import { CreateSightingDto } from './dtos/create-sighting.dto';

@Injectable()
export class SightingsService {
  constructor(
    @InjectRepository(CatSighting)
    private sightingsRepository: Repository<CatSighting>,
  ) {}

  listAllSightings(): Observable<CatSighting[]> {
    return from(this.sightingsRepository.find());
  }

  getSighting(id: number): Observable<CatSighting> {
    return from(this.sightingsRepository.findOne(id, { relations: ['cat'] }));
  }

  createSighting(
    createSightingDto: CreateSightingDto,
  ): Observable<CatSighting> {
    const { latlng, ...sightings } = createSightingDto;

    const [lat, lng] = latlng.split(',');
    const location: Point = {
      type: 'Point',
      coordinates: [lat, lng].map(parseFloat),
    };

    const sighting = this.sightingsRepository.create({
      ...sightings,
      location,
    });
    return from(this.sightingsRepository.save(sighting));
  }
}
