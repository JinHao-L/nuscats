import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { DatabaseConfigService } from './config/database.config';
import { UploadsModule } from './uploads/uploads.module';
import { AwsSdkModule } from 'nest-aws-sdk';
import { S3 } from 'aws-sdk';
import { S3ConfigService } from './config/s3.config';
import { AppConfigModule } from './config/config.module';

@Module({
  imports: [
    AppConfigModule,
    CatsModule,
    TypeOrmModule.forRootAsync({
      imports: [AppConfigModule],
      useClass: DatabaseConfigService,
    }),
    UploadsModule,
    AwsSdkModule.forRootAsync({
      defaultServiceOptions: {
        useFactory: ({ values }: S3ConfigService) => ({
          ...values,
          s3ForcePathStyle: true,
        }),
        imports: [AppConfigModule],
        inject: [S3ConfigService],
      },
      services: [S3],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
