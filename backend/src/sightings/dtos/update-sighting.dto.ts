import { PartialType } from '@nestjs/swagger';
import { CreateSightingDto } from './create-sighting.dto';

export class UpdateSightingDto extends PartialType(CreateSightingDto) {}
