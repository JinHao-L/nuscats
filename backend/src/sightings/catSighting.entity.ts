import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { Point } from 'geojson';

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
  @ApiProperty({
    type: String,
    title: 'location',
    example: '{"type":"Point","coordinates":[29.612849, 77.229883]}',
  })
  @Index({ spatial: true })
  @Column({
    type: 'geometry',
    srid: 4326,
    nullable: true,
    spatialFeatureType: 'Point',
  })
  location: Point;

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
