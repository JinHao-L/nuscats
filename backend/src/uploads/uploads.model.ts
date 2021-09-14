import { ApiProperty } from '@nestjs/swagger';
import { UploadResponse as IUploadResponse } from '@api/uploads';

export class UploadResponse implements IUploadResponse {
  @ApiProperty()
  signedUrl: string;

  @ApiProperty()
  imageUrl: string;
}
