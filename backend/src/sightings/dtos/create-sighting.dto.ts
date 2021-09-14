import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsInt,
  IsLatLong,
  IsNotEmpty,
  IsOptional,
  IsUrl,
} from 'class-validator';
import { SightingType } from './../catSighting.entity';

export class CreateSightingDto {
  @ApiProperty({
    description: 'The image of the sighting',
  })
  @IsUrl()
  @IsNotEmpty()
  image: string;

  @ApiProperty({
    required: false,
    description: 'Cat id',
  })
  @IsInt()
  @IsOptional()
  cat?: number;

  @ApiProperty({
    description: 'Location of sighting',
  })
  @IsLatLong()
  location: string;

  @ApiProperty({
    description: 'Sighting type',
    enum: SightingType,
  })
  @IsEnum(SightingType)
  type: SightingType;

  @ApiProperty({
    description: 'Description of sighting',
  })
  @IsNotEmpty()
  description: string;
}
