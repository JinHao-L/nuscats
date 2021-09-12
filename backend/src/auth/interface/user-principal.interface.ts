import { RoleType } from 'src/shared/enum/role-type.enum';

/**
 * User object that is passed around in req.user
 */
export interface UserPrincipal {
  readonly uuid: string;
  readonly username: string;
  readonly email: string;
  readonly roles: RoleType;
}
