import { IsNotEmpty, IsOptional, IsUrl } from 'class-validator';

export class CreateProfileDto {
  /**
   * The user's first name
   */
  @IsNotEmpty()
  first_name: string;

  /**
   * The user's last name
   */
  @IsNotEmpty()
  last_name: string;

  /**
   * URL to profile picture
   */
  @IsUrl({ require_tld: false })
  @IsOptional()
  profile_pic: string;
}
