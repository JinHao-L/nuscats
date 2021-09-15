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

@Entity()
export class Cat implements ICat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { unique: true })
  name: string;

  @Column('varchar')
  image: string;

  @Column({ type: 'boolean', default: false })
  neutered: boolean;

  @Column('text')
  one_liner: string;

  @Column('text')
  description: string;

  @Column({ type: 'enum', enum: UniversityZone })
  zone: UniversityZone;

  @OneToMany(() => CatSighting, (catSighting) => catSighting.cat)
  sightings?: CatSighting[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
