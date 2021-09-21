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
} from 'typeorm';
import { User } from '../users/user.entity';
import { CatSighting } from '../sightings/sighting.entity';

import { Profile as IProfile } from '@api/profiles';
@Entity()
export class Profile implements IProfile {
  @OneToOne((type) => User, (user) => user.profile, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn([
    { name: 'uuid', referencedColumnName: 'uuid' },
    { name: 'username', referencedColumnName: 'username' },
  ])
  user: User;

  @PrimaryColumn()
  uuid: string;

  @Column('varchar')
  username: string;

  @Column('varchar')
  first_name: string;

  @Column('varchar')
  last_name: string;

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
