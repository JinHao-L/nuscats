import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { databaseConfig, DatabaseConfigService } from './database.config';
import { s3Config, S3ConfigService } from './s3.config';
import validationSchema from './config.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig, s3Config],
      validationSchema: validationSchema,
    }),
  ],
  providers: [DatabaseConfigService, S3ConfigService],
  exports: [DatabaseConfigService, S3ConfigService, ConfigModule],
})
export class AppConfigModule {}
