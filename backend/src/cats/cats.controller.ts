import { JwtAuthGuard } from './../auth/guard/jwt-auth.guard';
import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { catchError, EMPTY, mergeMap, Observable } from 'rxjs';
import {
  ApiTags,
  ApiOkResponse,
  ApiParam,
  ApiNotFoundResponse,
  ApiForbiddenResponse,
  ApiCreatedResponse,
} from '@nestjs/swagger';

import { RoleType } from '@api/users';
import { Roles } from '../shared/decorators/role.decorator';
import { Cat } from './cats.entity';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dtos/create-cat.dto';
import { RolesGuard } from './../auth/guard/roles.guard';

@ApiTags('Cats')
@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  /**
   * Request a list of cats
   */
  @ApiOkResponse({
    type: [Cat],
    description: 'Successfully get list of cats',
  })
  @Get()
  listAllCats(): Observable<Cat[]> {
    return this.catsService.listAllCats();
  }

  /**
   * Request a cat by its id
   */
  @ApiOkResponse({
    type: Cat,
    description: 'Successfully get indicated cats',
  })
  @ApiNotFoundResponse({ description: 'Cat not found' })
  @ApiParam({ name: 'id', description: 'The cat id to query' })
  @Get('/:id')
  getCat(@Param('id', ParseIntPipe) id: number): Observable<Cat> {
    return this.catsService.findCatById(id).pipe(
      catchError(() => EMPTY),
      mergeMap(async (val) => {
        if (val) {
          return val;
        } else {
          throw new NotFoundException('User not found');
        }
      }),
    );
  }

  /**
   * Create a new cat entry
   */
  @ApiCreatedResponse({
    type: Cat,
    description: 'Successfully created cat',
  })
  @ApiForbiddenResponse({
    description: 'Forbidden. Operation allowed only for admin',
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleType.Admin)
  @Post()
  createCat(@Body() createCatDto: CreateCatDto): Observable<Cat> {
    return this.catsService.createCat(createCatDto);
  }

  /**
   * Delete a cat entry
   */
  @ApiOkResponse({
    type: Cat,
    description: 'Successfully get indicated cats',
  })
  @ApiForbiddenResponse({
    description: 'Forbidden. Operation allowed only for admin',
  })
  @ApiParam({ name: 'id', description: 'The cat id to update' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put('/:id')
  updateCat(@Param('id') id: string) {
    return;
  }
}
