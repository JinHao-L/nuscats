import { Injectable } from '@nestjs/common';
import { ConfigService, registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { AppConfigService } from './app.config';

const env = process.env;

export const databaseConfig = registerAs('database', () => ({
  url: env.DATABASE_URL,
  autoLoadEntities: env.DB_AUTOLOADENTITIES as unknown as boolean,
  synchronize: env.DB_SYNCHRONIZE as unknown as boolean,
}));

@Injectable()
export class DatabaseConfigService implements TypeOrmOptionsFactory {
  constructor(
    private configService: ConfigService,
    private appConfig: AppConfigService,
  ) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      ...this.configService.get<typeof databaseConfig>('database'),
      ssl: this.appConfig.isProd,
      type: 'postgres',
    };
  }
}
