import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { databaseConfig, DatabaseConfigService } from './database.config';
import { jwtConfig, JwtConfigService } from './jwt.config';
import { s3Config, S3ConfigService } from './s3.config';
import validationSchema from './config.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig, s3Config, jwtConfig],
      validationSchema: validationSchema,
    }),
  ],
  providers: [DatabaseConfigService, S3ConfigService, JwtConfigService],
  exports: [
    DatabaseConfigService,
    S3ConfigService,
    JwtConfigService,
    ConfigModule,
  ],
})
export class AppConfigModule {}
