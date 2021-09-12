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
import { RoleType } from 'src/shared/enum/role-type.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true })
  @Generated('uuid')
  uuid: string;

  @Column({ type: 'varchar', unique: true })
  @IsEmail()
  email: string;

  @Column({ type: 'varchar', unique: true })
  username: string;

  @Exclude()
  @Column('varchar')
  password_hash: string;

  @Exclude()
  @Column('varchar', { nullable: true })
  refresh_token_hash: string;

  @Column({
    type: 'enum',
    enum: RoleType,
  })
  roles: RoleType;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
