import { Profile } from 'src/profiles/profile.entity';
import { createGeoJsonPoint } from 'src/shared/utils/location';
import { SightingType } from '@api/sightings';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  range,
  toArray,
  mergeMap,
  map,
  catchError,
  EMPTY,
  lastValueFrom,
  take,
} from 'rxjs';
import { ILike, Repository } from 'typeorm';

import { CatSighting } from '../../sightings/sighting.entity';
import { ISeeder } from '../seeder.interface';
import { Cat } from '../../cats/cats.entity';
import { ReverseGeocodeConfigService } from 'src/config/reverse-geocode.config';
import { ReverseGeocodingResponse } from 'src/shared/inteface/geocoding.interface';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class SightingsSeeder implements ISeeder {
  constructor(
    @InjectRepository(CatSighting)
    private readonly sightingsRepository: Repository<CatSighting>,
    @InjectRepository(Cat)
    private readonly catsRepostiory: Repository<Cat>,
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    private configService: ReverseGeocodeConfigService,
    private httpService: HttpService,
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

        const lat = (
          1.2966 +
          ((Math.random() > 0.5 ? 0.001 : -0.009) + Math.random() * 0.008)
        ).toString();
        const lng = (
          103.7764 +
          (Math.random() > 0.5 ? 0.001 : -0.009) +
          Math.random() * 0.008
        ).toString();

        return this.httpService
          .get<ReverseGeocodingResponse>(
            this.configService.getReverseGeocodeUrl({ lat, lng }),
          )
          .pipe(
            map((res) => {
              return res.data.data[0].name;
            }),
            catchError((_err) => {
              return EMPTY;
            }),
            map((locName) => {
              return this.sightingsRepository.create({
                id: i,
                // randomise cat
                image: cats[randIdx].image,
                cat: cats[randIdx],
                // randomise location around NUS
                location: createGeoJsonPoint(lat, lng),
                location_name: locName || null,
                owner_id: users[randUser].uuid,
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
          );
      }),
      take(count),
      toArray(),
    );

    return lastValueFrom(observedSightingArray);
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
