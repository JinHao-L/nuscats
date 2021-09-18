import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { appConfig, AppConfigService } from './app.config';
import { databaseConfig, DatabaseConfigService } from './database.config';
import { jwtConfig, JwtConfigService } from './jwt.config';
import { s3Config, S3ConfigService } from './s3.config';
import { SeederConfigService, seederConfig } from './seeder.config';
import validationSchema from './config.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig, databaseConfig, s3Config, jwtConfig, seederConfig],
      validationSchema: validationSchema,
    }),
  ],
  providers: [
    AppConfigService,
    DatabaseConfigService,
    S3ConfigService,
    JwtConfigService,
    SeederConfigService,
  ],
  exports: [
    AppConfigService,
    DatabaseConfigService,
    S3ConfigService,
    JwtConfigService,
    SeederConfigService,
    ConfigModule,
  ],
})
export class AppConfigModule {}
