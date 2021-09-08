import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Cat } from './cat.entity';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dtos/create-cat.dto';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Get()
  listAllCats(): Observable<Cat[]> {
    return this.catsService.listAllCats();
  }

  @Get('/:id')
  getCat(@Param('id') id: string) {
    return;
  }

  @Post()
  createCat(@Body() createCatDto: CreateCatDto): Observable<Cat> {
    return this.catsService.createCat(createCatDto);
  }

  @Put('/:id')
  updateCat(@Param('id') id: string) {
    return;
  }
}
