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
  constructor({
    id,
    name,
    neutered = false,
    one_liner = '',
    description = '',
    zone,
  }: {
    id: number;
    name: string;
    neutered?: boolean;
    one_liner?: string;
    description?: string;
    zone: UniversityZone;
  }) {
    this.id = id;
    this.name = name;
    this.neutered = neutered;
    this.one_liner = one_liner;
    this.description = description;
    this.zone = zone;
    this.created_at = new Date();
    this.updated_at = new Date();
  }

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
