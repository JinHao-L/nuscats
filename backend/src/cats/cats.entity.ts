import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UniversityZone, Cat as ICat } from '@api/cats';

@Entity()
export class Cat implements ICat {
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
