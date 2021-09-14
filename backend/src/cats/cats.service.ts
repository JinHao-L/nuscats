import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { Cat } from './cats.entity';
import { CreateCatDto } from './dtos/create-cat.dto';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat)
    private catRepository: Repository<Cat>,
  ) {}

  listAllCats(): Observable<Cat[]> {
    return from(this.catRepository.find());
  }

  findCatById(id: number): Observable<Cat> {
    return from(this.catRepository.findOne({ id }));
  }

  createCat(createCatDto: CreateCatDto): Observable<Cat> {
    const cat = this.catRepository.create({
      ...createCatDto,
    });
    return from(this.catRepository.save(cat));
  }
}
