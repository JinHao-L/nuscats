import { Inject, Injectable } from '@nestjs/common';
import { ConfigType, registerAs } from '@nestjs/config';

const env = process.env;

export const s3Config = registerAs('s3', () => ({
  region: env.AWS_REGION,
  endpoint: env.AWS_S3_ENDPOINT || undefined,
  signatureVersion: env.AWS_S3_SIGNATURE_VERSION || undefined,
  bucketName: env.AWS_S3_BUCKET_NAME,
}));

@Injectable()
export class S3ConfigService {
  constructor(
    @Inject(s3Config.KEY) private config: ConfigType<typeof s3Config>,
  ) {}

  public get values() {
    return this.config;
  }

  public get bucketName() {
    return this.config.bucketName;
  }
}
