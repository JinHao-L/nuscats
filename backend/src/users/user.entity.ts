import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { IsEmail } from 'class-validator';
import { Exclude } from 'class-transformer';
import { ApiHideProperty } from '@nestjs/swagger';

import { User as IUser, RoleType } from '@api/users';
import { Profile } from 'src/profiles/profile.entity';

@Entity({ name: 'users' })
@Unique(['username', 'uuid'])
export class User implements IUser {
  @PrimaryGeneratedColumn()
  @ApiHideProperty()
  @Exclude()
  id: number;

  @Column({ type: 'uuid', unique: true })
  @Generated('uuid')
  uuid: string;

  @Column({ type: 'varchar', unique: true })
  @IsEmail()
  email: string;

  @Column({ default: false })
  is_email_confirmed: boolean;

  @Column({ type: 'varchar', unique: true })
  username: string;

  @Exclude()
  @ApiHideProperty()
  @Column('varchar')
  password_hash: string;

  @Exclude()
  @ApiHideProperty()
  @Column('varchar', { nullable: true })
  refresh_token_hash: string;

  @Column({
    type: 'enum',
    enum: RoleType,
  })
  roles: RoleType[];

  @OneToOne((type) => Profile, (profile) => profile.user, { nullable: true })
  profile?: Profile;

  @Exclude()
  @ApiHideProperty()
  @CreateDateColumn()
  created_at: Date;

  @Exclude()
  @ApiHideProperty()
  @UpdateDateColumn()
  updated_at: Date;
}
