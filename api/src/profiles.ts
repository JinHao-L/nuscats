import { User } from './users';

export interface Profile {
  user: string | User; // uuid reference to user
  first_name: string;
  last_name: string;
  profile_pic: string;
  created_at: Date;
  updated_at: Date;
}
