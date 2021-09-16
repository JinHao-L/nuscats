import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { PutObjectRequest } from 'aws-sdk/clients/s3';
import { InjectAwsService } from 'nest-aws-sdk';
import { S3ConfigService } from 'src/config/s3.config';
import { UploadResponse } from './uploads.model';
import * as moment from 'moment';
import { v4 as uuid } from 'uuid';

const FIVE_MINUTES_IN_SECONDS = 300;
const FORMAT_DATE = 'YYYY-MM-DD';
const IMAGE_TYPE = '.png';

interface SignedUrlParams extends Omit<PutObjectRequest, 'Expires'> {
  Expires: number;
}

@Injectable()
export class UploadsService {
  private bucketName: string;

  constructor(
    @InjectAwsService(S3) private readonly s3: S3,
    config: S3ConfigService,
  ) {
    this.bucketName = config.bucketName;
  }

  createCatUploadLink(catId: string): UploadResponse {
    const key = `cats/${catId}${IMAGE_TYPE}`;
    return {
      signedUrl: this.getSignedUrl(key),
      imageUrl: this.getImageUrl(key),
    };
  }

  createUserUploadLink(userId: string): UploadResponse {
    const key = `users/${userId}${IMAGE_TYPE}`;
    return {
      signedUrl: this.getSignedUrl(key),
      imageUrl: this.getImageUrl(key),
    };
  }

  createSightingUploadLink(): UploadResponse {
    const date = moment(new Date()).format(FORMAT_DATE);
    const key = `sightings/${date}/${uuid()}${IMAGE_TYPE}`;

    return {
      signedUrl: this.getSignedUrl(key),
      imageUrl: this.getImageUrl(key),
    };
  }

  private getSignedUrl(key: string): string {
    return this.s3.getSignedUrl('putObject', this.createParams(key));
  }

  private getImageUrl(key: string): string {
    return `${this.s3.endpoint.href}${this.bucketName}/${key}`;
  }

  private createParams(Key: string): SignedUrlParams {
    return {
      Bucket: this.bucketName,
      Expires: FIVE_MINUTES_IN_SECONDS,
      ContentType: 'image/png',
      Key,
    };
  }
}
