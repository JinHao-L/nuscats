import { User } from './users';

export interface Profile {
  uuid: string; // uuid reference to user
  user?: User; 
  first_name: string;
  last_name: string;
  profile_pic: string;
  created_at: Date;
  updated_at: Date;
}
