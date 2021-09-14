import { IsNotEmpty, IsOptional, IsUrl } from 'class-validator';

export class CreateProfileDto {
  @IsNotEmpty()
  first_name: string;

  @IsNotEmpty()
  last_name: string;

  @IsUrl()
  @IsOptional()
  profile_pic: string;
}
