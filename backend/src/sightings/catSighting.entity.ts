import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Cat } from '../cats/cat.entity';

export enum SightingType {
  Emergency = 'Emergency',
  CatSighted = 'CatSighted',
}

@Entity()
export class CatSighting {
  @PrimaryGeneratedColumn()
  id: number;

  // Not sure about this
  @Column('bytea')
  image: string;

  @ManyToOne(() => Cat, (cat: Cat) => cat.id)
  cat: number;

  // Double check
  @Column('geometry')
  location: string;

  @Column({
    type: 'enum',
    enum: SightingType,
  })
  type: SightingType;

  @Column('varchar')
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
