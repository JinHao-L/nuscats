import { Inject, Injectable } from '@nestjs/common';
import { ConfigType, registerAs } from '@nestjs/config';
import { ServiceAccount } from 'firebase-admin';

const env = process.env;

export const firebaseConfig = registerAs(
  'firebase',
  (): ServiceAccount => ({
    projectId: env.FIREBASE_PROJECT_ID,
    privateKey: env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    clientEmail: env.FIREBASE_CLIENT_EMAIL,
  }),
);

@Injectable()
export class FirebaseConfigService {
  constructor(
    @Inject(firebaseConfig.KEY)
    private config: ConfigType<typeof firebaseConfig>,
  ) {}

  public get values(): ServiceAccount {
    return this.config;
  }

  public get projectId() {
    return this.config.projectId;
  }

  public get privateKey() {
    return this.config.privateKey;
  }

  public get clientEmail() {
    return this.config.clientEmail;
  }
}
