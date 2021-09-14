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
import { IsUrl } from 'class-validator';

import { Cat } from '../cats/cats.entity';

export enum SightingType {
  Emergency = 'Emergency',
  CatSighted = 'CatSighted',
}

@Entity()
export class CatSighting {
  @PrimaryGeneratedColumn()
  id: number;

  @IsUrl()
  @Column('varchar')
  image: string;

  @ManyToOne(() => Cat, (cat: Cat) => cat.id)
  cat: number;

  /**
   * The location of the sighting
   * @example '{"type":"Point","coordinates":[29.612849, 77.229883]}'
   */
  @Index({ spatial: true })
  @Column({
    type: 'geometry',
    srid: 4326,
    nullable: true,
    spatialFeatureType: 'Point',
  })
  location: Point;

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
