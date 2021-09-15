import { SightingType } from '@api/sightings';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmUpsert } from '@nest-toolbox/typeorm-upsert';
import { firstValueFrom, map, range, toArray } from 'rxjs';
import { Repository } from 'typeorm';

import { CatSighting } from '../../sightings/catSighting.entity';
import { ISeeder } from '../seeder.interface';
import { catDatas, catImages } from './cat.data';

@Injectable()
export class SightingsSeeder implements ISeeder {
  constructor(
    @InjectRepository(CatSighting)
    private readonly sightingsRepository: Repository<CatSighting>,
  ) {}

  /**
   * Generate specified number of 'random' sightings
   *
   * Recommended: at most 10
   * Will override any other sightings using the same id
   *
   * @param count number of sightings to generate
   * @returns Array of 'random' sightings
   */
  private async generateRandomSighting(count: number): Promise<CatSighting[]> {
    const observedSightingArray = range(1, count).pipe(
      map((i: number) => {
        const randIdx = Math.floor(Math.random() * catDatas.length);

        return this.sightingsRepository.create({
          id: i,
          // randomise cat
          image: catImages[randIdx],
          cat: { name: catDatas[randIdx].name },
          // randomise location around NUS
          location: {
            type: 'Point',
            coordinates: [
              1.2966 +
                ((Math.random() > 0.5 ? 0.001 : -0.009) +
                  Math.random() * 0.008),
              103.7764 +
                ((Math.random() > 0.5 ? 0.001 : -0.009) +
                  Math.random() * 0.008),
            ],
          },
          is_seed: true,
          // randomise the sighting type
          ...(Math.random() < 0.7
            ? {
                type: SightingType.CatSighted,
                description: 'Saw this cat today',
              }
            : {
                type: SightingType.Emergency,
                description: 'This cat looks sick',
              }),
        });
      }),
      toArray(),
    );

    return firstValueFrom(observedSightingArray);
  }

  async seed(): Promise<any> {
    const sightings = await this.generateRandomSighting(10);

    return this.sightingsRepository.save(sightings).finally(() => {
      console.log('* Seeded cats sightings...');
    });
  }

  async drop(): Promise<any> {
    console.log('> Dropping sightings');
    return this.sightingsRepository.delete({});
  }
}
