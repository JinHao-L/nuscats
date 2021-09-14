import { ApiProperty } from '@nestjs/swagger';

export class UploadResponse {
  @ApiProperty()
  signedUrl: string;

  @ApiProperty()
  imageUrl: string;
}
