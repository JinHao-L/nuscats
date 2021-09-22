import { IsOptional, IsUrl } from 'class-validator';
import { ApiHideProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  PrimaryColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { User } from '../users/user.entity';
import { CatSighting } from '../sightings/sighting.entity';

import { Profile as IProfile } from '@api/profiles';
import { Exclude } from 'class-transformer';

@Entity()
export class Profile implements IProfile {
  @OneToOne((type) => User, (user) => user.profile, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'uuid', referencedColumnName: 'uuid' })
  @JoinColumn({ name: 'username', referencedColumnName: 'username' })
  user: User;

  @PrimaryGeneratedColumn()
  @ApiHideProperty()
  @Exclude()
  id: number;

  @Column('uuid')
  @Unique('unique_profile_uuid', ['uuid'])
  uuid: string;

  @Column('varchar')
  @Unique('unique_profile_username', ['username'])
  username: string;

  @Column('varchar', { nullable: true })
  first_name: string;

  @Column('varchar', { nullable: true })
  last_name: string;

  @Column({ default: false })
  is_profile_setup: boolean;

  @IsUrl()
  @IsOptional()
  @Column('varchar', { nullable: true })
  profile_pic: string;

  @OneToMany((type) => CatSighting, (post) => post.owner)
  @ApiHideProperty()
  posts?: CatSighting[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
