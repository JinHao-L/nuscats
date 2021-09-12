import { JwtAuthGuard } from './../auth/guard/jwt-auth.guard';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Roles } from 'src/shared/decorators/role.decorator';
import { RoleType } from 'src/shared/enum/role-type.enum';
import { Cat } from './cat.entity';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dtos/create-cat.dto';
import { RolesGuard } from './../auth/guard/roles.guard';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Get()
  listAllCats(): Observable<Cat[]> {
    return this.catsService.listAllCats();
  }

  @Get('/:id')
  getCat(@Param('id') id: string) {
    return this.catsService.findCatById(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  @Roles(RoleType.Admin)
  createCat(@Body() createCatDto: CreateCatDto): Observable<Cat> {
    return this.catsService.createCat(createCatDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put('/:id')
  updateCat(@Param('id') id: string) {
    return;
  }
}
