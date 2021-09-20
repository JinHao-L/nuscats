import { HttpModule } from '@nestjs/axios';
import { ReverseGeocodeConfigService } from '../config/reverseGeocode.config';
import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfigModule } from 'src/config/config.module';
import { CatSighting } from './catSighting.entity';
import { SightingsController } from './sightings.controller';
import { SightingsService } from './sightings.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CatSighting]),
    CacheModule.register({
      ttl: 5, // seconds
      max: 10, // maximum number of items in cache
    }),
    AppConfigModule,
    HttpModule,
  ],
  controllers: [SightingsController],
  providers: [SightingsService, ReverseGeocodeConfigService],
})
export class SightingsModule {}
