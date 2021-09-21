import { AppLoggerMiddleware } from './shared/middleware/logger.middleware';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AwsSdkModule } from 'nest-aws-sdk';
import { S3 } from 'aws-sdk';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { SightingsModule } from './sightings/sightings.module';
import { DatabaseConfigService } from './config/database.config';
import { UploadsModule } from './uploads/uploads.module';
import { S3ConfigService } from './config/s3.config';
import { AppConfigModule } from './config/config.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProfilesModule } from './profiles/profiles.module';
import { SeederModule } from './seeders/seeder.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    AppConfigModule,
    CatsModule,
    AuthModule,
    UsersModule,
    ProfilesModule,
    SightingsModule,
    UploadsModule,
    TypeOrmModule.forRootAsync({
      imports: [AppConfigModule],
      useClass: DatabaseConfigService,
    }),
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
    SeederModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}
