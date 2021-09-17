import { Profile } from 'src/profiles/profile.entity';
import { createGeoJsonPoint } from 'src/shared/utils/location';
import { SightingType } from '@api/sightings';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { range, toArray, mergeMap, firstValueFrom } from 'rxjs';
import { ILike, Repository } from 'typeorm';

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
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
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
    users: Profile[],
    count: number,
  ): Promise<CatSighting[]> {
    const observedSightingArray = range(1, count).pipe(
      mergeMap((i: number) => {
        const randIdx = Math.floor(Math.random() * cats.length);
        const randUser = Math.floor(Math.random() * users.length);

        return this.sightingsRepository.save({
          id: i,
          // randomise cat
          image: cats[randIdx].image,
          cat: cats[randIdx],
          // randomise location around NUS
          location: createGeoJsonPoint(
            (
              1.2966 +
              ((Math.random() > 0.5 ? 0.001 : -0.009) + Math.random() * 0.008)
            ).toString(),
            (
              103.7764 +
              (Math.random() > 0.5 ? 0.001 : -0.009) +
              Math.random() * 0.008
            ).toString(),
          ),
          ownerId: users[randUser].uuid,
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
    const users = await this.profileRepository.find({
      where: { first_name: ILike(`User%`) },
    });
    const sightings = await this.generateRandomSighting(cats, users, 10);

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
