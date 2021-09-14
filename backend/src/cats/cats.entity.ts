import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column('varchar')
  name: string;

  @ApiProperty()
  @Column({ type: 'boolean', default: false })
  neutered: boolean;

  @ApiProperty()
  @Column({ type: 'text', default: false })
  one_liner: string;

  @ApiProperty()
  @Column('text')
  description: string;

  @ApiProperty()
  @Column({
    type: 'enum',
    enum: UniversityZone,
  })
  zone: UniversityZone;

  @ApiProperty()
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updated_at: Date;
}
