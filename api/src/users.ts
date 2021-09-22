import { Profile } from ".";

export enum RoleType {
  Admin = "admin",
  User = "user",
}

export interface User {
  // id: number;
  uuid: string;
  email: string;
  username: string;
  is_email_confirmed: boolean;
  roles: RoleType[];
  profile?: Profile;
  // created_at: Date;
  // updated_at: Date;
}
