import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
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
  ],
  controllers: [SightingsController],
  providers: [SightingsService],
})
export class SightingsModule {}
