import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum UniversityZone {
  Computing = 'Computing',
  Arts = 'Arts',
  Engineering = 'Engineering',
  Utown = 'Utown',
}

@Entity()
export class Cat {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column('varchar')
  name: string;

  @ApiProperty()
  @Column({ type: 'boolean', default: false })
  neutered: boolean;

  @ApiProperty()
  @Column({ type: 'text', default: false })
  one_liner: string;

  @ApiProperty()
  @Column('text')
  description: string;

  @ApiProperty()
  @Column({
    type: 'enum',
    enum: UniversityZone,
  })
  zone: UniversityZone;

  @ApiProperty()
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updated_at: Date;
}
