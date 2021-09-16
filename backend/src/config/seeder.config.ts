import { Inject, Injectable } from '@nestjs/common';
import { ConfigType, registerAs } from '@nestjs/config';

const env = process.env;

export const seederConfig = registerAs('seeder', () => ({
  shouldSeed: env.SEEDER_SHOULD_SEED,
  shouldRefresh: env.SEEDER_SHOULD_REFRESH,
}));

@Injectable()
export class SeederConfigService {
  constructor(
    @Inject(seederConfig.KEY) private config: ConfigType<typeof seederConfig>,
  ) {}

  public get values() {
    return this.config;
  }

  public get shouldSeed() {
    return this.config.shouldSeed === 'true';
  }

  public get shouldRefresh() {
    return this.config.shouldRefresh === 'true';
  }
}
