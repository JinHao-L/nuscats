import { ReverseGeocodeConfigService } from '../config/reverse-geocode.config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SightingsSeeder } from './seeds/sightings.seeder';
import { SeederConfigService } from './../config/seeder.config';
import { ISeeder } from './seeder.interface';
import { AppConfigModule } from '../config/config.module';

import { UsersSeeder } from './seeds/users.seeder';
import { CatsSeeder } from './seeds/cats.seeder';
import { SeederService } from './seeder.service';

import { Cat } from '../cats/cats.entity';
import { Profile } from '../profiles/profile.entity';
import { User } from '../users/user.entity';
import { CatSighting } from '../sightings/sighting.entity';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cat, User, Profile, CatSighting]),
    AppConfigModule,
    HttpModule,
  ],
  providers: [
    SeederConfigService,
    { provide: ISeeder, useClass: UsersSeeder },
    UsersSeeder,
    SightingsSeeder,
    CatsSeeder,
    ReverseGeocodeConfigService,
    {
      provide: SeederService,
      useFactory: (
        seederConfigService: SeederConfigService,
        ...seeders: ISeeder[]
      ): SeederService => new SeederService(seederConfigService, seeders),
      // order of injection matters (cats before sightings)
      inject: [SeederConfigService, UsersSeeder, CatsSeeder, SightingsSeeder],
    },
  ],
})
export class SeederModule {}
