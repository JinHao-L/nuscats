import { ApiProperty } from '@nestjs/swagger';
import { RoleType } from 'src/shared/enum/role-type.enum';
import { User } from 'src/users/user.entity';

/**
 * User object that is passed around in req.user
 */
export class UserPrincipal {
  @ApiProperty()
  readonly uuid: string;
  @ApiProperty()
  readonly username: string;
  @ApiProperty()
  readonly email: string;
  @ApiProperty()
  readonly roles: RoleType;
}

export function getUserPrincipal(user: User): UserPrincipal {
  return {
    uuid: user.uuid,
    username: user.username,
    email: user.email,
    roles: user.roles,
  };
}
