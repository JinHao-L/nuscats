import { catchError, EMPTY, map, mergeMap, Observable } from 'rxjs';
import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  ParseUUIDPipe,
  UseGuards,
  Req,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { Request } from 'express';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfilesService } from './profiles.service';
import { UserPrincipal } from '../auth/interface/user-principal.interface';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { RolesGuard } from '../auth/guard/roles.guard';
import { Roles } from '../shared/decorators/role.decorator';
import { RoleType } from '../shared/enum/role-type.enum';
import { Profile } from './profile.entity';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Post()
  create(
    @Req() request: Request,
    @Body() createProfileDto: CreateProfileDto,
  ): Observable<Profile> {
    return this.profilesService.create(
      createProfileDto,
      request.user as UserPrincipal,
    );
  }

  @Get()
  findAll(): Observable<Profile[]> {
    return this.profilesService.findAll();
  }

  @Get(':uuid')
  findOne(@Param('uuid', ParseUUIDPipe) uuid: string): Observable<Profile> {
    return this.profilesService.findOne(uuid).pipe(
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

  @Patch(':uuid')
  update(
    @Req() request: Request,
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body() updateProfileDto: UpdateProfileDto,
  ): Observable<Profile> {
    const user = request.user as UserPrincipal;
    if (user.uuid !== uuid && !user.roles.includes(RoleType.Admin)) {
      throw new UnauthorizedException('Cannot modify user');
    }
    return this.profilesService.update(uuid, updateProfileDto);
  }

  @UseGuards(RolesGuard)
  @Roles(RoleType.Admin)
  @Delete(':uuid')
  remove(@Param('uuid', ParseUUIDPipe) uuid: string): Observable<string> {
    return this.profilesService
      .remove(uuid)
      .pipe(map(() => 'Deleted successfully'));
  }
}
