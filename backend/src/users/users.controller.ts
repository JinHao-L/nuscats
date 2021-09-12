import { throwIfEmpty } from 'rxjs';
import { UsersService } from './users.service';
import {
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('/:uuid')
  getUser(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.usersService
      .findByUuid(uuid)
      .pipe(throwIfEmpty(() => new NotFoundException()));
  }
}
