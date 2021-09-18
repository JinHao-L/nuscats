import { Profile } from './../profiles/profile.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  JoinColumn,
} from 'typeorm';
import { Point } from 'geojson';
import { IsUrl } from 'class-validator';

import { Cat } from '../cats/cats.entity';
import { SightingType, CatSighting as ICatSighting } from '@api/sightings';
import { Exclude } from 'class-transformer';
import { ApiHideProperty } from '@nestjs/swagger';

@Entity()
export class CatSighting implements ICatSighting {
  @PrimaryGeneratedColumn()
  id: number;

  @IsUrl()
  @Column('varchar')
  image: string;

  @Column('decimal', { nullable: true })
  cat_id?: number;

  @ManyToOne(() => Cat, (cat: Cat) => cat.sightings, {
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'cat_id', referencedColumnName: 'id' })
  cat?: Cat;

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

  /**
   * Used to identify seeded sightings
   */
  @Exclude()
  @ApiHideProperty()
  @Column({ type: 'boolean', default: false })
  is_seed: boolean;

  @Column('varchar')
  description: string;

  @Column('varchar', { nullable: true })
  owner_id?: string;

  @ManyToOne(() => Profile, (user: Profile) => user.uuid, {
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'owner_id', referencedColumnName: 'uuid' })
  @ApiHideProperty()
  owner?: Profile;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
