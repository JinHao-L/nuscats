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
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  name: string;

  @Column({ type: 'boolean', default: false })
  neutered: boolean;

  @Column({ type: 'text', default: false })
  one_liner: string;

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
