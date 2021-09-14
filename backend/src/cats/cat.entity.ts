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
    description = '',
    zone,
  }: {
    id: number;
    name: string;
    neutered?: boolean;
    description?: string;
    zone: UniversityZone;
  }) {
    this.id = id;
    this.name = name;
    this.neutered = neutered;
    this.description = description;
    this.zone = zone;
    this.created_at = new Date();
    this.updated_at = new Date();
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  name: string;

  @Column({ type: 'boolean', default: false })
  neutered: boolean;

  @Column('text')
  description: string;

  @Column({
    type: 'enum',
    enum: UniversityZone,
  })
  zone: UniversityZone;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
