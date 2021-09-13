import { RoleType } from 'src/shared/enum/role-type.enum';
import { User } from 'src/users/user.entity';

/**
 * User object that is passed around in req.user
 */
export interface UserPrincipal {
  readonly uuid: string;
  readonly username: string;
  readonly email: string;
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
