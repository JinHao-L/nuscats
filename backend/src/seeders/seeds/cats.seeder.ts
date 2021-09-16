import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmUpsert } from '@nest-toolbox/typeorm-upsert';

import { ISeeder } from '../seeder.interface';
import { catDatas } from './cat.data';
import { Cat } from '../../cats/cats.entity';

@Injectable()
export class CatsSeeder implements ISeeder {
  constructor(
    @InjectRepository(Cat)
    private readonly catRepository: Repository<Cat>,
  ) {}

  async seed(): Promise<any> {
    // Use cat name to write into database, overrides any cat with the same name
    return TypeOrmUpsert(this.catRepository, catDatas, 'name').finally(() => {
      console.log('* Seeded cat repository...');
    });
  }

  async drop(): Promise<any> {
    console.log('> Dropping cats');
    return this.catRepository.delete({});
  }
}
