import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UniversityZone, Cat as ICat } from '@api/cats';
import { CatSighting } from '../sightings/sighting.entity';
import { ApiHideProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

@Entity()
export class Cat implements ICat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { unique: true })
  name: string;

  @Column('varchar')
  image: string;

  @Column({ type: 'boolean', nullable: true })
  neutered: boolean;

  @Column('text')
  one_liner: string;

  @Column('text')
  description: string;

  @Column({ type: 'enum', enum: UniversityZone })
  zone: UniversityZone;

  /**
   * Used to identify seeded cats
   */
  @Exclude()
  @ApiHideProperty()
  @Column({ type: 'boolean', default: false })
  is_seed?: boolean;

  /**
   * Referential mapping of cats -> sightings
   */
  @ApiHideProperty()
  @OneToMany(() => CatSighting, (catSighting) => catSighting.cat)
  sightings?: CatSighting[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
