import { ApiProperty } from '@nestjs/swagger';
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

@Entity()
export class Profile {
  @ApiProperty()
  @OneToOne((type) => User, { cascade: true })
  @JoinColumn({ referencedColumnName: 'uuid' })
  @PrimaryColumn()
  user: string;

  @ApiProperty()
  @Column('varchar')
  first_name: string;

  @ApiProperty()
  @Column('varchar')
  last_name: string;

  @ApiProperty()
  @IsUrl()
  @IsOptional()
  @Column('varchar', { nullable: true })
  profile_pic: string;

  @ApiProperty()
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updated_at: Date;
}
