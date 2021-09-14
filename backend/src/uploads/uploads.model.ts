import { UploadResponse as IUploadResponse } from '@api/uploads';

export class UploadResponse implements IUploadResponse {
  signedUrl: string;

  imageUrl: string;
}
