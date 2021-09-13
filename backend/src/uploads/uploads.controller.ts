import { Controller, Get, Param } from '@nestjs/common';
import { UploadResponse } from './uploads.model';
import { UploadsService } from './uploads.service';

@Controller('uploads')
export class UploadsController {
  constructor(private uploadsService: UploadsService) {}

  @Get('/cats/:id')
  createCatUploadLink(@Param('id') id: string): UploadResponse {
    return this.uploadsService.createCatUploadLink(id);
  }

  @Get('/users')
  createUserUploadLink(@Param('id') id: string): UploadResponse {
    return this.uploadsService.createUserUploadLink(id);
  }

  @Get('/sightings')
  createSightingUploadLink(): UploadResponse {
    return this.uploadsService.createSightingUploadLink();
  }
}
