import { Controller, Get, Param } from '@nestjs/common';
import { ApiParam, ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { UploadResponse } from './uploads.dto';
import { UploadsService } from './uploads.service';

@ApiTags('Uploads')
@Controller('uploads')
export class UploadsController {
  constructor(private uploadsService: UploadsService) {}

  @ApiParam({ name: 'id', description: 'The cat id for uploading cat image' })
  @ApiOkResponse({
    description:
      'Successfully get the signed URL and image URL for uploading of cat image',
    type: UploadResponse,
  })
  @Get('/cats/:id')
  createCatUploadLink(@Param('id') id: string): UploadResponse {
    return this.uploadsService.createCatUploadLink(id);
  }

  @ApiParam({
    name: 'id',
    description: 'The user id for uploading profile image',
  })
  @ApiOkResponse({
    description:
      'Successfully get the signed URL and image URL for uploading of user profile image',
    type: UploadResponse,
  })
  @Get('/users/:id')
  createUserUploadLink(@Param('id') id: string): UploadResponse {
    return this.uploadsService.createUserUploadLink(id);
  }

  @ApiOkResponse({
    description:
      'Successfully get the signed URL and image URL for uploading of sightings image',
    type: UploadResponse,
  })
  @Get('/sightings')
  createSightingUploadLink(): UploadResponse {
    return this.uploadsService.createSightingUploadLink();
  }
}
