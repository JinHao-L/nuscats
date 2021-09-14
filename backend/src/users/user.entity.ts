import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsEmail } from 'class-validator';
import { Exclude } from 'class-transformer';
import { ApiHideProperty } from '@nestjs/swagger';
import { RoleType } from '../shared/enum/role-type.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'uuid', unique: true })
  @Generated('uuid')
  uuid: string;

  @Column({ type: 'varchar', unique: true })
  @IsEmail()
  email: string;

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

  @Exclude()
  @ApiHideProperty()
  @CreateDateColumn()
  created_at: Date;

  @Exclude()
  @ApiHideProperty()
  @UpdateDateColumn()
  updated_at: Date;
}
