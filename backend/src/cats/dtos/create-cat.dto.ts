import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { UniversityZone } from '@api/cats';

export class CreateCatDto {
  @ApiProperty({ example: 'Ashy', description: 'The name of the cat' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Whether the cat is neutered',
    default: false,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  neutered?: boolean;

  @ApiProperty({
    example:
      "Bachelor's in Laziness, Masters's in Belly Flops and PhD in Napping",
    description: 'The one-liner description of the cat',
    required: false,
  })
  @IsOptional()
  @IsString()
  one_liner?: string;

  @ApiProperty({
    description: 'Long detailed description of cat',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    enum: UniversityZone,
    description: 'The university zone that the cat belongs to',
  })
  @IsEnum(UniversityZone)
  zone: UniversityZone;
}
