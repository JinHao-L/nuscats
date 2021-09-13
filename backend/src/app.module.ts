import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import {
  DatabaseConfigService,
  databaseConfig,
} from './config/database.config';
import validationSchema from './config/config.schema';
import { SightingsModule } from './sightings/sightings.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig],
      validationSchema: validationSchema,
    }),
    CatsModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: DatabaseConfigService,
    }),
    SightingsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
