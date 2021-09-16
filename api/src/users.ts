import { Profile } from './profiles';

export enum RoleType {
  Admin = "admin",
  User = "user",
}

export class User {
  id: number;
  uuid: string;
  email: string;
  username: string;
  roles: RoleType[];
  profile?: Profile;
  created_at: Date;
  updated_at: Date;
}
