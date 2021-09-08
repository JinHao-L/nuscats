import { Injectable } from '@nestjs/common';
import { ConfigService, registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

const env = process.env;

export const databaseConfig = registerAs('database', () => ({
  host: env.DB_HOST,
  port: env.DB_PORT as unknown as number,
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: env.DB_DATABASE,
  autoLoadEntities: env.DB_AUTOLOADENTITIES as unknown as boolean,
  synchronize: env.DB_SYNCHRONIZE as unknown as boolean,
}));

@Injectable()
export class DatabaseConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      ...this.configService.get<typeof databaseConfig>('database'),
      type: 'postgres',
    };
  }
}
