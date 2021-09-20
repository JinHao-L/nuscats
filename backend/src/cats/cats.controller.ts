import { JwtAuthGuard } from './../auth/guard/jwt-auth.guard';
import {
  Body,
  CacheInterceptor,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
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
import { number } from 'joi';

@ApiTags('Cats')
@UseInterceptors(CacheInterceptor)
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
   * Update a cat entry
   */
  @ApiOkResponse({
    description: 'Successfully updated cat',
  })
  @ApiForbiddenResponse({
    description: 'Forbidden. Operation allowed only for admin',
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiParam({ name: 'id', description: 'The cat id to update' })
  @Put('/:id')
  updateCat(@Param('id', ParseIntPipe) id: number, @Body() catDto: CreateCatDto): void {
    this.catsService.updateCat(id, catDto)
    return;
  }

  /**
   * Deletes a cat entry
   */
  @ApiOkResponse({
    description: 'Successfully deleted cat',
  })
  @ApiForbiddenResponse({
    description: 'Forbidden. Operation allowed only for admin', 
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiParam({ name: 'id', description: 'The cat id to delete' })
  @Delete('/:id')
  deleteCat(@Param('id', ParseIntPipe) id: number): void {
    this.catsService.deleteCat(id);
    return;
  }
}
