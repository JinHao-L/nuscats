import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
import { UniversityZone } from '@api/cats';

export class CreateCatDto {
  /**
   * The name of the cat
   * @example 'Ashy'
   */
  @IsString()
  @IsNotEmpty()
  name: string;

  /**
   * Whether the cat is neutered
   */
  @IsOptional()
  @IsBoolean()
  neutered?: boolean;

  /**
   * The one-liner description of the cat
   * @example 'Bachelor's in Laziness, Masters's in Belly Flops and PhD in Napping'
   */
  @IsOptional()
  @IsString()
  one_liner?: string;

  /**
   * A long detailed description of the cat
   * @example 'I am a strong and healthy boy! I have white fur with patches of stripes and yellow eyes.'
   */
  @IsString()
  @IsNotEmpty()
  description: string;

  /**
   * An image of the cat
   * @example 'https://picsum.photos/200'
   */
  @IsUrl()
  @IsNotEmpty()
  image: string;

  /**
   * The university zone that the cat belongs to
   * @example 'Utown'
   */
  @IsEnum(UniversityZone)
  zone: UniversityZone;
}
