import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { databaseConfig, DatabaseConfigService } from './database.config';
import { jwtConfig, JwtConfigService } from './jwt.config';
import { s3Config, S3ConfigService } from './s3.config';
import { SeederConfigService, seederConfig } from './seeder.config';
import validationSchema from './config.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig, s3Config, jwtConfig, seederConfig],
      validationSchema: validationSchema,
    }),
  ],
  providers: [
    DatabaseConfigService,
    S3ConfigService,
    JwtConfigService,
    SeederConfigService,
  ],
  exports: [
    DatabaseConfigService,
    S3ConfigService,
    JwtConfigService,
    SeederConfigService,
    ConfigModule,
  ],
})
export class AppConfigModule {}
