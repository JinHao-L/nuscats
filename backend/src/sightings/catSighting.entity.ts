import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  // Not sure about this
  @ApiProperty()
  @Column('varchar')
  image: string;

  @ApiProperty()
  @ManyToOne(() => Cat, (cat: Cat) => cat.id)
  cat: number;

  // Double check
  @ApiProperty()
  @Column('geometry')
  location: string;

  @ApiProperty()
  @Column({
    type: 'enum',
    enum: SightingType,
  })
  type: SightingType;

  @ApiProperty()
  @Column('varchar')
  description: string;

  @ApiProperty()
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updated_at: Date;
}
