import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { appConfig, AppConfigService } from './app.config';
import { databaseConfig, DatabaseConfigService } from './database.config';
import { jwtConfig, JwtConfigService } from './jwt.config';
import { s3Config, S3ConfigService } from './s3.config';
import { SeederConfigService, seederConfig } from './seeder.config';
import validationSchema from './config.schema';
import {
  ReverseGeocodeConfigService,
  reverseGeocodeConfig,
} from './reverse-geocode.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [
        appConfig,
        databaseConfig,
        s3Config,
        jwtConfig,
        seederConfig,
        reverseGeocodeConfig,
      ],
      validationSchema: validationSchema,
    }),
  ],
  providers: [
    AppConfigService,
    DatabaseConfigService,
    S3ConfigService,
    JwtConfigService,
    ReverseGeocodeConfigService,
    SeederConfigService,
  ],
  exports: [
    ConfigModule,
    AppConfigService,
    DatabaseConfigService,
    S3ConfigService,
    JwtConfigService,
    ReverseGeocodeConfigService,
    SeederConfigService,
  ],
})
export class AppConfigModule {}
