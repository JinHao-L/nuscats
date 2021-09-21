import { Inject, Injectable } from '@nestjs/common';
import { ConfigType, registerAs } from '@nestjs/config';

const env = process.env;

export const reverseGeocodeConfig = registerAs('reverseGeocode', () => ({
  api_key: env.POSITIONSTACK_API_KEY,
}));

@Injectable()
export class ReverseGeocodeConfigService {
  constructor(
    @Inject(reverseGeocodeConfig.KEY)
    private config: ConfigType<typeof reverseGeocodeConfig>,
  ) {}

  public get values() {
    return this.config;
  }

  public get apiKey() {
    return this.config.api_key;
  }

  public getReverseGeocodeUrl({ lat, lng }) {
    return `http://api.positionstack.com/v1/reverse?access_key=${this.config.api_key}&query=${lat},${lng}`;
  }
}
