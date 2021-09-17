import { SightingType } from '@api/sightings';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { range, toArray, mergeMap, firstValueFrom } from 'rxjs';
import { Repository } from 'typeorm';

import { CatSighting } from '../../sightings/catSighting.entity';
import { ISeeder } from '../seeder.interface';
import { Cat } from '../../cats/cats.entity';

@Injectable()
export class SightingsSeeder implements ISeeder {
  constructor(
    @InjectRepository(CatSighting)
    private readonly sightingsRepository: Repository<CatSighting>,
    @InjectRepository(Cat)
    private readonly catsRepostiory: Repository<Cat>,
  ) {}

  /**
   * Generate specified number of 'random' sightings
   *
   * Recommended: at most 10
   *
   * @param count number of sightings to generate
   * @returns Array of 'random' sightings
   */
  private async generateRandomSighting(
    cats: Cat[],
    count: number,
  ): Promise<CatSighting[]> {
    const observedSightingArray = range(1, count).pipe(
      mergeMap((i: number) => {
        const randIdx = Math.floor(Math.random() * cats.length);

        return this.sightingsRepository.save({
          id: i,
          // randomise cat
          image: cats[randIdx].image,
          cat: cats[randIdx],
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
    // delete seeded data
    const deletePromise = this.sightingsRepository.delete({ is_seed: true });

    const cats = await this.catsRepostiory.find();
    const sightings = await this.generateRandomSighting(cats, 10);

    return deletePromise
      .then(() => this.sightingsRepository.save(sightings))
      .finally(() => {
        console.log('* Seeded cats sightings...');
      });
  }

  async drop(): Promise<any> {
    console.log('> Dropping sightings');
    return this.sightingsRepository.delete({});
  }
}
