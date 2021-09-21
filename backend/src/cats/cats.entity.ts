import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UniversityZone, Cat as ICat } from '@api/cats';
import { CatSighting } from 'src/sightings/catSighting.entity';
import { ApiHideProperty } from '@nestjs/swagger';

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
