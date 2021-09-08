import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { UniversityZone } from '../cat.entity';

export class CreateCatDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsBoolean()
  neutered?: boolean;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEnum(UniversityZone)
  zone: UniversityZone;
}
