import { HttpModule } from '@nestjs/axios';
import { ReverseGeocodeConfigService } from '../config/reverse-geocode.config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfigModule } from 'src/config/config.module';
import { CatSighting } from './sighting.entity';
import { SightingsController } from './sightings.controller';
import { SightingsService } from './sightings.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CatSighting]),
    AppConfigModule,
    HttpModule,
  ],
  controllers: [SightingsController],
  providers: [SightingsService, ReverseGeocodeConfigService],
})
export class SightingsModule {}
