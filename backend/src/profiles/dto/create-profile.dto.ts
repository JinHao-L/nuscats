import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsUrl } from 'class-validator';

export class CreateProfileDto {
  @ApiProperty({
    description: "The user's first name",
  })
  @IsNotEmpty()
  first_name: string;

  @ApiProperty({
    description: "The user's last name",
  })
  @IsNotEmpty()
  last_name: string;

  @ApiProperty({
    required: false,
    description: 'URL to profile picture',
  })
  @IsUrl()
  @IsOptional()
  profile_pic: string;
}
