import { IsOptional, IsUrl } from 'class-validator';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  PrimaryColumn,
} from 'typeorm';
import { User } from '../users/user.entity';

import { Profile as IProfile } from '@api/profiles';
@Entity()
export class Profile implements IProfile {
  @OneToOne((type) => User, { cascade: true })
  @JoinColumn({ referencedColumnName: 'uuid' })
  @PrimaryColumn()
  user: string;

  @Column('varchar')
  first_name: string;

  @Column('varchar')
  last_name: string;

  @IsUrl()
  @IsOptional()
  @Column('varchar', { nullable: true })
  profile_pic: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
